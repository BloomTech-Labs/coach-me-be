const db = require('../data/db_config')
const UserModel = require('./user-model');

class ClientModel extends UserModel{

    async addClient(data){
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
    }
}

module.exports = ClientModel