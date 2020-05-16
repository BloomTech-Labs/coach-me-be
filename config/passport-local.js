const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/client-model");
const bcrypt = require("bcrypt");

function localLogin(passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email", passReqToCallback: true },
			async (req, email, password, done) => {
				const user = await User.getUserByEmail(email, req.query.user_type);
				if (!user) return done(null, false, { message: "User not found" });
				const passwordMatches = await bcrypt.compare(password, user.password);
				return passwordMatches
					? done(null, user)
					: done(null, false, { message: "Your password is incorrect!" });
			}
		)
	);

	// Serializies users and adds information to the session object.
	passport.serializeUser(function (user, done) {
		done(null, { id: user.id, type: user.user_type });
	});
	// Deserialize users so we can view the information through
	// req.session.passport
	passport.deserializeUser(function (user, done) {
		done(null, user);
	});
}
module.exports = localLogin;
