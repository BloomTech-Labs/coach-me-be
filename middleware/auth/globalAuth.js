const httpError = require('http-errors');

const Client = require('../../models/client-model');

class Authentic {

    async protected(req, res, next){
        if( !req.session.passport ) next(httpError(401, 'Please log in to continue.'));
        next();
    }

    async private(req, res, next){
        try{
            if( req.params.id === req.session.passport.user.id || req.session.passport.user.id === Client.getCoach( req.params.id ) ) return next();
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
}

module.exports = new Authentic();