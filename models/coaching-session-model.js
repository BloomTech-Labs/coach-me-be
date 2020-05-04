const db = require("../data/db_config");

class CoachingSessionModel {

    async getUserSessions(userID, userType = 'client'){
        try{
            return await db('sessions')
                        .where({[`${userType}_id`]: userID});
        } catch(err){
            throw err;
        }
    }

}

module.exports = new CoachingSessionModel();