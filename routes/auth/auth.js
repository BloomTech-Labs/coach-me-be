const router = require('express').Router();
const passport = require("passport");
const bcrypt = require("bcrypt"); 
const client_db = require('../../models/client-model');
const coach_db = require('../../models/coach-models');
const httpError = require('http-errors'); 

router.post('/register', require("../../middleware/auth/RegisterErrorHandler")(), async (req, res, next)=>{
    try {
        const {user_type} = req.query;
        const user = await client_db.getUserByEmail(req.body.email, user_type);
        if(user) return res.status(402).json("There is an account associated with your email address. Try logging in.");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        switch(user_type){
            case 'client':
                await client_db.addClient({
                    ...req.body,
                    password: hashedPassword
                });
                return res.json('success');
            case 'coach':
                await coach_db.addCoach({
                    ...req.body,
                    password: hashedPassword
                })
                return res.json('success');
            default:
                throw new httpError(400, "user_type query value must be provided. (e.g: /auth?user_type='coach'")
        }
    } catch (error) {
        next(error);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        if(req.session?.passport?.user) return res.redirect(`/api/${req.query.user_type}/${req.session.passport.user.id}`);
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
        return res.json('Logged out successfully.');
        
    } catch (error) {
        next(error);
    }
});

router.get("/google", passport.authenticate('google', {scope: ['profile','https://www.googleapis.com/auth/user.birthday.read']}))

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/api/auth/logout'}), 
(req, res)=>{
    console.log(req.session)
   res.writeHead(302, {
       'Location': 'http://localhost:3000'
   });
   res.end()
})

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/api/auth/logout'}), 
(req, res)=>{
    res.send(req.user)
})

// Facebook will redirect the user to this URL after routerroval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.


module.exports = router;
