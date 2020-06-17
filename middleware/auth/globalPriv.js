const httpError = require('http-errors');
const Client = require('../../models/client-model');
const db = require('../../data/db_config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AccessController {

    async protected(req, res, next){
        if( !req.session.passport ) return res.status(401).json('Unauthorized');
        next();
    }

    async private(req, res, next){
        try{
            if( req.userID === req.session.passport.user.id || req.session.passport.user.id === Client.getCoach( req.userID ) ) return next();
            next(new httpError(401, 'You don\'t have permission to access that data.'));
        } catch(err){
            next(err);
        }
    }

    async userOnly(req, res, next){
        try{
            if( req.params.id === req.session.passport.user.id ) return next();
            next(new httpError(401, 'That data is only available to it\'s owner.'));
        } catch(err){
            next(err);
        }
    }

    async validateRecoveryToken(req, res, next){ 
		try {
            const { token } = req.query;
            const { password } = req.body;
            if(!password) return res.status(400).json("new password is required as a 'password' field.")
            const userToken = await db('password_reset').where({token}).first();
            if(!userToken) res.status(404).json('The token you provided is not valid.');
            const {id, user_type} = await jwt.verify(token, process.env.JWT_SECRET);
            await db(user_type).where('id', id).update({password: await bcrypt.hash(password, 10)});
            res.json('Your password was sccessfully updated!');
		} catch (error) {
            switch(error.name){
                case 'TokenExpiredError':
                    res.status(401).json('Woops. Seems like your password recovery link expired.')
                    break;
                default: 
                    next(error)
            }
		}
	}
}

module.exports = new AccessController();