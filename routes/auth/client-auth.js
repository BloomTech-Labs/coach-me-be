const router = require('express').Router();
const passport = require("passport")
const db = require('../../models/client-model');
const Clients = new db();
const bcrypt = require("bcrypt");


router.post('/register', async (req, res, next)=>{
    try {
        const {first_name, last_name, email, phone, password, confirm_password, height, sex} = req.body;
        // Regular expresion that tests if the password is strong enough
        // ^ = String starts
        // (?=.*[a-z]) contains any lowercase alphabetical char from a-z
        // (?=.*[A-Z]) containps any uppercase alphabetical char from A-Z
        // (?=.*[0-9]) contains any number
        // (?=.*[!@#\$%\^&\*]) contains any special character
        // (?=.{8,}) string length of at lest 8 characters (You can add a second number to have the length be between those)
        
        const passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        // All of this could probably move to a middleware later. Checking required fields are there,
        // Checking if passwords match, checking if pass is strong enough. We could have Detailed error messages
        // and do password checks for each field.

        if (!first_name || !last_name || !email || !phone || !password || !confirm_password || !height|| !sex){
            return res.status(400).json("All fields must be filled!");
        }
        if(password !== confirm_password){
            return res.status(400).json("Passwords do not match.");
        }
        if(!passRegex.test(password)){
            return res.status(400).json("Password must contain at least 8 characters, one upper case alphabetical character, and a number.");
        }
        const user = await Clients.getClientByEmail(email);
        if(user){
            return res.status(402).json("There is an account associated with your email address. Try loggin in.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
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
           return res.json("What are we going to do? :(")
        }

    })(req, res, next);
})


module.exports = router;