const httpError = require('http-errors');
const passport = require('passport');

const UsersModel = require('../../models/user-model');
const User = new UsersModel();
const AuthSession = require('../../models/auth-session-model');

class Authentic {

    async protected(req, res, next){
        try {
            if( !req.sessionID ){
                // Check for session data passed in req, if none return error
                next(httpError(401, 'Please log in to continue.'));
            } else {
                // Verify session data
                AuthSession.checkSession(req.sessionID);
                next();
            }

        } catch (err) {
            next(err);
        }
    }
}

module.exports = new Authentic();