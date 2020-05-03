const db = require("../data/db_config");

class UserModel {
    async getUserByEmail(email, userType = 'client'){
        try {
            const user = await db(userType)
            .where('email', email).first()
            return user;
            
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id, userType = 'client'){
        try {
            return await db(userType)
                        .where({ id })
                        .first();
        } catch (error) {
            throw error;
        }
    }
    
    /***
     * getHealthData takes up to three arguments, and returns resulting health metric data in descending or by creation date.
     * @param {String} client_id - The selected user's id (UUID) for lookup
     * @param {Integer} count - Number of results to return (defaults to 5)
     * @param {String[]} metrics - Which data to return (defaults to all)
     */
    async getHealthData(client_id, count = 5, metrics = '*'){
        try{
            return await db('health_data')
                        .select(...metrics)
                        .where({client_id})
                        .orderBy('submitted_at', 'DESC')
                        .limit(count);
    } catch(err){
            throw err;
        }
    }
}


module.exports = UserModel;