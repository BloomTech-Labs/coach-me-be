// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const client_db = require("../models/client-model");

// function googleAuth(passport){
//     passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CONSUMER_KEY,
//         clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
//         callbackURL: '/api/auth/google/callback',

//     }, async (token, tokenSecret, profile, done)=> {
//         // first_name: data.first_name,
//         // last_name: data.last_name,
//         // email: data.email,
//         // phone: data.phone,
//         // dob: data.dob,
//         // password: data.password,
//         // height: data.height,
//         // sex: data.sex,
//         // gender: data.gender
//         // const user = await client_db.getUserByGoogleId(profile.id);
//         // if(user){
//         //     return done(null, user)
//         // }
//         // const newUser = await client_db.addClient({
//         //     first_name: profile._json.given_name,
//         //     last_name: profile._json.family_name,
//         //     email: profile._json.email
//         // })
//         done(null, profile);
//     })
// )}

// module.exports = googleAuth
