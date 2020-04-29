const router = require('express').Router({mergeParams: true});
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../../models/user-model');
const db = new UserModel();

passport.use(new LocalStrategy(
    (username, password, done) =>{
        
    }
))



module.exports = router;