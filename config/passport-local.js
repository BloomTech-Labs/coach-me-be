const LocalStrategy = require("passport-local").Strategy;
const db = require('../models/client-model');
const User = new db();
const bcrypt = require("bcrypt");

function localLogin(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done)=>{
        const user = await User.getClientByEmail(email);
        if(!user){
            return done(null, false, {message: 'User not found'});
        }
        
        const hashedPassword = await bcrypt.compare(password, user.password);

        if(hashedPassword){
            return done(null, user)
        }

        return done(null, false, {message: "Your password is incorrect!"})

    }));

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done)=>{
        const user = await User.getClientById(id);
        done(null, user)
    })
}



module.exports = localLogin;

