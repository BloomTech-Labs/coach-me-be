const express = require("express");
const session = require("express-session");
const Ddos = require("ddos");

const logger = require("log4js")
	.configure({
		appenders: { errors: { type: "file", filename: "errors.log" } },
		categories: { default: { appenders: ["errors"], level: "error" } },
	})
	.getLogger("errors");

const passport = require("passport");

// Passport config
require("./config/passport-local")(passport);
// require("./config/passport-google")(passport);
// require("./config/passport-facebook")(passport);

const app = express();

// Security
app.use(require("helmet")());

if(process.env.NODE_ENV !== 'development'){
	const ddos = new Ddos({ burst: 10, limit: 15 });
	app.use(ddos.express);
}

const whitelist = [
	"http://localhost:3000",
	"http://localhost:3001",
	"https://f5f296270de9.ngrok.io",
	process.env.CLIENT_URL,
];
app.use(require('cors')({
	preflightContinue: true,
	credentials: true,
	origin: function(origin, cb){
		if (whitelist.includes(origin) || !origin) {
			return cb(null, true)
		} else {
			console.log('is it having an error?')
			console.log(origin);
			return cb(new Error('Not allowed by CORS'))
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json());
app.use(require("cookie-parser")(process.env.SESSION_SECRET));

// Passport middleware
app.use(passport.initialize());

// Sessions
const Knex = require("knex");
const knexfile = require("./knexfile");
const knex = require("./data/db_config");
const KnexSessionStore = require("connect-session-knex")(session);
const store = new KnexSessionStore({
	knex: knex,
	tablename: "auth_sessions",
});

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: {
			path: "/",
			// 30 minutes
			secure: false,
			httpOnly: false,
			expires: 1800000,
			maxAge: 1000000000,
		},
		store: store,
	})
);

app.use(passport.session());

// Routes
app.use("/api", require("./routes/router-index"));

// Error handling
let errors = 0;
app.use((error, req, res, next) => {
	logger.error(error);
	errors++;
	console.log(`You have ${errors} server errors. Someone is getting fired...`);
	return res.status(500).json("There was an internal server error");
});

// Google verification
app.use(express.static("public"));

module.exports = app;
module.exports.store = store;
