const GoogleStrategy = require("passport-google-oauth20").Strategy;
const client_db = require("../models/client-model");

function googleAuth(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: '/api/auth/google/callback'
    }, async (token, tokenSecret, profile, done)=>{
        console.log(profile)
    })
)}

module.exports = googleAuth