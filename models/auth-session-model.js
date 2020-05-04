const httpError = require('http-errors');

const db = require("../data/db_config");

class AuthSession {
    async checkSession(sid){
        try{
            const sessionData =  await db('auth_sessions')
                                        .where({sid})
                                        .first();
            this.activeSessions();
            console.log(sid);
            console.log('session data: ', sessionData);
            return sessionData;
        } catch(err){
            console.log(err)
            throw new httpError(err)
        }
    }

    async activeSessions(){
        console.log( await db('auth_sessions'))
    }
}

module.exports = new AuthSession();