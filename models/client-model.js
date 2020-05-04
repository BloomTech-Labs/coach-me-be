const db = require('../data/db_config');
const httpError = require('http-errors');
const UserModel = require('./user-model');

class ClientModel extends UserModel{

    // === BASIC CLIENT C(R)UD - Read/Retrieval inherited from UserModel === //

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

    /***
     * updateClientData takes two arguments, and inserts the updated user information.
     * @param {String} client_id - The selected user's id (UUID) for lookup
     * @param {Object} updatedData - Object containing updated data for insertion (valid keys: phone, gender, med_list, profile_pic_id, dob, first_name, last_name )
     * @returns {Object} - Object representing updated data
     */
    async updateClientData(client_id, updatedData){
        const updateables = ['phone', 'gender', 'med_list', 'profile_pic_id', 'dob', 'first_name', 'last_name', 'height'];
        try{
            Object.keys(updatedData).forEach(update => {
                if(! updateables.includes(update)) throw new httpError(400, 'Ensure you are only attempting to updated changeable data (phone, gender, med_list, profile_pic_id, dob, first_name, last_name )');
            });
            await db('client')
                   .where({id: client_id})
                   .update(updatedData)
                   .then(data => data);
            return await this.getUserById(client_id);
    } catch(err){
            throw err;
        }
    }

    async deleteClient(id){
        try{
            return await db('client')
                         .where({id})
                         .del();
        } catch(err){
            throw(err);
        }
    }

    async getCoach(client_id){
        try{
            return await db('coach_client')
                         .select('coach_id as id')
                         .where({client_id})
                         .first();
        } catch(err){
            throw err;
        }
    }

    // === HEALTH DATA METRICS === //

    /***
     * addHealthData takes two arguments, and inserts the metric data into the DB and returns the newly inserted item.
     * @param {String} client_id - The selected user's id (UUID) for lookup
     * @param {Object} metricData - Object containing health data for insertion (valid keys: systolic_bp, diastolic_bp, weight)
     * @returns {Object} - Object representing newly inserted health data
     */
    async addHealthData(client_id, metricData){
        try{
            metricData.client_id = client_id;
            const coach = await this.getCoach(client_id);
            metricData.coach_id = coach.id;
            return await db('health_data')
                         .insert(metricData)
                         .then(data => metricData);
    } catch(err){
            throw err;
        }
    }

    /***
     * updateMetricData takes two arguments, and inserts the updated user health metric data.
     * @param {String} client_id - The selected user's id (UUID) for lookup
     * @param {Object} updatedData - Object containing updated data for insertion (valid keys: phone, gender, med_list, profile_pic_id, dob, first_name, last_name )
     * @returns {Object} - Object representing updated data
     */
    async updateMetricData(id, updatedData){
        const updateables = ['systolic_bp', 'diastolic_bp', 'pulse', 'weight'];
        try{
            Object.keys(updatedData).forEach(update => {
                if(! updateables.includes(update)) throw new httpError(400, 'Ensure you are only attempting to updated changeable data (systolic_bp, diastolic_bp, pulse, weight )');
            });
            return await db('health_data')
                  .where({id})
                  .update(updatedData)
                  .then(data => data);
    } catch(err){
            throw err;
        }
    }

    async deleteMetricInstance(id){
        try{
            return await db('health_data')
                         .where({id})
                         .del();
        } catch(err) {
            throw(err);
        }
    }

}
module.exports = new ClientModel();