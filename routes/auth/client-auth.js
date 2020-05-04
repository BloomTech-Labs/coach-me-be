const router = require('express').Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

// 
const Authd = require('../../middleware/auth/globalAuth');
// 

const Clients = require('../../models/client-model');


router.post('/register', require("../../middleware/auth/clientAuthErrorHandler")(), async (req, res, next)=>{
    try {
        const user = await Clients.getUserByEmail(req.body.email);
        if(user) return res.status(402).json("There is an account associated with your email address. Try logging in.");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await Clients.addClient({
            ...req.body,
            password: hashedPassword
        });
        return res.json('success');
    } catch (error) {
        next(error);
    }
});

// Serializies users and adds information to the session object.
passport.serializeUser(function(user, done) {
    done(null, {id: user.id, type: 'client'});
});
// Deserialize users so we can view the information through
// req.session.passort
passport.deserializeUser(function(user, done) {
    done(null, user);
});
           
router.post('/login', Authd.protected ,async (req, res, next) => {
    try {
        // If there is a session already, then you get redirected to the route
        // /dashboard. I chose this at random, so we may want to change it :)
        if(req.session?.passport?.user) return res.redirect('/dashboard');
        passport.authenticate('local', {userProperty: 'email'},
        (err, user, info) => {
            if(!user) return res.json(info.message);

            req.login(user, function(error) {
                if (error) throw error;
                res.json('Login successful');
            });
        })(req, res, next);    
    } catch (error) {
        next(error);
        }
    }
);     
router.post('/logout', async (req, res, next)=>{
    try {
        req.session.destroy();
        return res.clearCookie('token').json('Logged out successfully.');
        
    } catch (error) {
        next(error);
    }
});


module.exports = router;