const httpError = require('http-errors');
const UserModel = require('../models/user-model');
const User = new UserModel

class PathValidator {
    async checkID(req, res, next){
        try{
            const userID = await User.getUserById( req.params.id, req.baseUrl.split('/')[req.baseUrl.split('/').length - 1].includes('coach') ? 'coach' : 'client' );
            if( !userID ) throw new httpError(404, `No user with ID:${req.params.id} found.`);
            next();
        } catch(err){
            next( err )
        }
    }
}

module.exports = new PathValidator();