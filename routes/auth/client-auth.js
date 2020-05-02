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
router.post('/login', async (req, res, next)=>{
    passport.authenticate('local', (info, user, err) => {
        if (err){
            return res.status(401).json(err.message)
        }
        if(user){
            return res.json('success')
        }
    })(req, res, next);
});
router.post('/logout', async (req, res, next)=>{
    console.log(req.signedCookies)
    return res.clearCookie('token').json('Logged out successfully.')
});

module.exports = router;