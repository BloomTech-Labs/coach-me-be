const httpError = require('http-errors');
const clientDB = require('../../models/client-model');

class ClientDataMiddleware {
    async checkID(req, res, next){
        try{
            const userID = await clientDB.getUserById( req.params.id );
            if( !userID ) throw new httpError(404, `No user with ID:${req.params.id} found.`);
            next();
        } catch(err){
            next( err )
        }
    }

    async needToKnow(req, res, next){
        try{
            // check [token?] for user type and ID, if user: ensure user ID matches requested ID and active session for user
            // if coach: ensure coach is requested user's coach and session matches coach's active session
            next();
        } catch(err){
            next( err )
        }
    }

    

    async isClient(req, res, next){
        try{
            // check [token?] for user ID and ensure user ID matches requested ID and active session for user
            next();
        } catch(err){
            next( err )
        }
    }

}

module.exports = new ClientDataMiddleware();