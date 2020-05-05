const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/client-model");
const bcrypt = require("bcrypt");

function localLogin(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        const user = await User.getUserByEmail(email, req.userType);
        if (!user) return done(null, false, { message: "User not found" });
        const passwordMatches = await bcrypt.compare(password, user.password);
        return passwordMatches ? done(null, user) : done(null, false, { message: "Your password is incorrect!" });
      }
    )
  );
}
module.exports = localLogin;
