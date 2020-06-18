const FacebookStrategy = require("passport-facebook").Strategy;

function facebookAuth(passport){
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done)=>{

        done(null, profile);
    })
)}

module.exports = facebookAuth;