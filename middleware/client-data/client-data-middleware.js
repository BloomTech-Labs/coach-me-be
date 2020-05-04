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
}

module.exports = new ClientDataMiddleware();