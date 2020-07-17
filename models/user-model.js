const db = require('../data/db_config');
const jwt = require('jsonwebtoken');
class UserModel {
  // === USER RETRIEVAL === //

  async getUserByEmail(email, userType = 'client') {
    try {
      const user = await db(userType)
        .where('email', email.toLowerCase())
        .first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByPhone(number, userType = 'client') {
    try {
      const user = await db(userType).where('phone', number).first();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id, userType = 'client') {
    try {
      if (userType === 'client') {
        let info;
        return await db
          .select('*')
          .from('client')
          .where('client.id', id)
          .first()
          .leftOuterJoin('coach_client as rel', function () {
            this.on('rel.client_id', '=', 'client.id');
          })
          .then((data) => {
            info = data;
            return data;
          })
          .finally(async () => {
            if (info.coach_id) {
              info.coach = {
								...await db('coach').where('id', info.coach_id).first(),
								password: null
							}
            }
						return info;
          });
      }
      return await db(userType).where({ id }).first();
    } catch (error) {
      throw error;
    }
  }

  async getUserByGoogleId(id, user_type = 'client') {
    try {
      return await db(user_type).where('google_id', id);
    } catch (error) {
      throw error;
    }
  }

  async getUserByFacebookId(id, user_type = 'client') {
    try {
      return await db(user_type).where('facebook_id', id);
    } catch (error) {
      throw error;
    }
  }

  async getAllUsersByType(user_type) {
    try {
      return await db(user_type).select(
        'id',
        'first_name',
        'last_name',
        'email'
      );
    } catch (error) {
      throw error;
    }
  }

  // === HEALTH DATA METRICS === //

  /***
   * getHealthData takes up to three arguments, and returns resulting health metric data in descending or by creation date.
   * @param {String} client_id - The selected user's id (UUID) for lookup
   * @param {Integer} count - Number of results to return (defaults to 5)
   * @param {String[]} metrics - Which data to return (defaults to all)
   */
  async getHealthData(client_id, count = 20, metrics = '*') {
    try {
      return await db('health_data')
        .select(...metrics)
        .where({ client_id })
        .orderBy('submitted_at', 'DESC')
        .limit(count);
    } catch (err) {
      throw err;
    }
  }

  async getHealthDataInstance(id, userID, userType = 'client') {
    try {
      return await db('health_data')
        .where({ [`${userType}_id`]: userID })
        .where({ id })
        .first();
    } catch (err) {
      throw err;
    }
  }
  // === COACHING-CLIENT RELATIONSHIP BINDING === //

  /***
   * bindUsers takes up two user IDs, one for coach and one for client, and binds them in a coach-client relationship.
   * @param {String} coachID - The selected coach's id (UUID)
   * @param {String} clientID - The selected client's id (UUID)
   */

  async bindUsers(coachID, clientID) {
    try {
      return await db('coach_client').insert({
        coach_id: coachID,
        client_id: clientID,
      });
    } catch (err) {
      throw err;
    }
  }

  // === COACHING SESSIONS === //

  /***
   * getCoachingSessions takes up to two arguments, and returns array of sessions associated with the user.
   * @param {String} userID - The selected user's id (UUID) for lookup
   * @param {String} userType - Type of user the user_id is associated with (coach or client)
   * @returns {Array} Array of sessions associated with the user
   */
  async getCoachingSessions(userID, userType = 'client') {
    try {
      return await db('sessions').where({ [`${userType}_id`]: userID });
    } catch (err) {
      throw err;
    }
  }

  async getCoachingSession(id, userID, userType = 'client') {
    try {
      return await db('sessions')
        .where({ id })
        .where({ [`${userType}_id`]: userID })
        .first();
    } catch (err) {
      throw err;
    }
  }

  async addCoachingSession({coach_id, client_id, notes, date}) {
    try {
      return await db('sessions').insert({
        session_date: date,
        notes,
        coach_id,
        client_id,
      });
    } catch (error) {
      throw error;
    }
  }

  // === ACCOUNT UTILITIES === //

  async generateRecoveryToken(id, userType = 'client') {
    try {
      const token = await jwt.sign(
        {
          id: id,
          user_type: userType,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      await db('password_reset').insert({
        [`${userType}_id`]: id,
        token: token,
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async updateProfileImage(id, img, userType) {
    await db(userType).where('id', id).update({
      profile_pic_id: img,
    });
    return 'success';
  }
}

module.exports = UserModel;
