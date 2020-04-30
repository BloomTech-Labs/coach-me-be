const express = require('express');
const Ddos = require('ddos');
const ddos = new Ddos({burst: 10, limit: 15})
const logger = require('log4js').configure({
    appenders: {errors: {type: 'file', filename: 'errors.log' }},
    categories: {default: {appenders: ['errors'], level: 'error'}}
}).getLogger('errors');

const passport = require('passport');

// Passport config
require('./config/passport-local')(passport);

const session = require('express-session')
const app = express();

// Basic middleware
app.use(express.json());

// Security
app.use(require('cors')());
app.use(require('helmet')());
app.use(ddos.express);

// Sessions

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/api', require('./routes/router-index'));


// Error handling

app.use((error, req, res, next) =>{
    logger.error(error);
    return res.status(500).json({
        message: "There was an internal server error."
    })
});


module.exports = app;