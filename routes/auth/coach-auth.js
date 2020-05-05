const router = require('express').Router({mergeParams: true});
const passport = require("passport");
const bcrypt = require("bcrypt"); 
const coach_db = require("../../models/coach-models")


router.post('/register', require('../../middleware/auth/RegisterErrorHandler')('coach'), async (req, res, next)=>{
    try {
        const user = await Clients.getUserByEmail(req.body.email, 'coach');
        if(user) return res.status(402).json("There is an account associated with your email address. Try logging in.");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await coach_db.addCoach({...req.body, password: hashedPassword});
        return res.json('success');
    } catch (error) {
        next(error);
    }
});


module.exports = router;