const db = require("../data/db_config");

class UserModel{
    async getUserByEmail(email){
        try {
            const user = await db('client')
            .where('email', email);
            return user;
            
        } catch (error) {
            throw error;
        }
    }
}


module.exports = UserModel;