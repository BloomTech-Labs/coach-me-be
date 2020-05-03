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

const app = express();

// Basic middleware
app.use(express.json());
app.use(require("cookie-parser")(process.env.SESSION_SECRET))

// Security
app.use(require('cors')());
app.use(require('helmet')());
app.use(ddos.express);

// Sessions
const session = require('express-session')
const KnexSessionStore = require("connect-session-knex")(session);

const Knex = require("knex");
const knexfile = require('./knexfile')
const knex = Knex(knexfile[process.env.NODE_ENV]);
const store = new KnexSessionStore({
    knex: knex,
    tablename: 'auth_sessions'
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 10000
    },
    store: store
}));

// Passport middleware

app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/api', require('./routes/router-index'));


// Error handling

app.use((error, req, res, next) =>{
    logger.error(error);
    return res.status(error.status ? error.status : 500).json({
        message: error.message ? error.message : "There was an internal server error."
    });
});


module.exports = app;