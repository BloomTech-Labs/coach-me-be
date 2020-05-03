const db = require('../data/db_config');
const UserModel = require('./user-model');
class ClientModel extends UserModel{
    async addClient(data){
        try {
            await db('client').insert({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                password: data.password,
                height: data.height,
                sex: data.sex,
                gender: data.gender
            });
        } catch (error) {
            throw error;
        }
    }
    async getCoach(client_id){
        try{
            return await db('coach_client')
                        .where({client_id})
                        .first();
        } catch(err){
            throw err;
        }
    }
    /***
     * addHealthData takes two arguments, inserts the metric data into the DB and returns the newly inserted item.
     * @param {String} client_id - The selected user's id (UUID) for lookup
     * @param {Object} metricData - Object containing health data for insertion (valid keys: systolic_bp, diastolic_bp, weight)
     * @returns {Object} - Object representing newly inserted health data
     */
    async addHealthData(client_id, metricData){
        try{
            metricData.client_id = client_id;
            metricData.coach_id = await this.getCoach(client_id);
            return await db('health_data')
                        .insert(metricData)
                        .then(data);
    } catch(err){
            throw err;
        }
    }
}
module.exports = new ClientModel()