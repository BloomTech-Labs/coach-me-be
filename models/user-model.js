const db = require("../data/db_config");

class UserModel{
    async getClientByEmail(email){
        try {
            const client = await db('client')
            .where('email', email).first();
            return client;
            
        } catch (error) {
            throw error;
        }
    }

    async getClientById(id){
        try {
            const client = await db('client')
            .where('id', id).first();
            return client
        } catch (error) {
            throw error;
        }
    }
}


module.exports = UserModel;