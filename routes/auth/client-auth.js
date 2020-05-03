const router = require('express').Router();
const passport = require("passport");
const Clients = require('../../models/client-model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
router.post('/register', require("../../middleware/auth/clientAuthErrorHandler")(), async (req, res, next)=>{
    try {
        const user = await Clients.getUserByEmail(req.body.email);
        if(user){
            return res.status(402).json("There is an account associated with your email address. Try loggin in.");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await Clients.addClient({
            ...req.body,
            password: hashedPassword
        });
        return res.json('success')
    } catch (error) {
        next(error)
    }
});

passport.serializeUser(function(user, done) {
    console.log('serialized')
    done(null, {id: user.id, type: 'client'});
});
passport.deserializeUser(function(user, done) {
    console.log('deserialized')
    done(null, user);
});
           
router.post('/login', 
    function(req, res, next) {
        if(req?.session?.passport?.user) return res.redirect('/dashboard')
        passport.authenticate('local', 
        function(err, user, info) {
            if(!user) return res.send(info.message)
                req.login(user, function(error) {
                    if (error) return next(error);
                    return res.json('Login successful');
                });
        })(req, res, next);
    }
);
                
router.post('/logout', async (req, res, next)=>{
    req.logOut()
    console.log(req?.user)
    return res.clearCookie('token').json('Logged out successfully.')
});


module.exports = router;