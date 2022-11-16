const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.APP_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await User.findById(payload.newUser.id)
        .then(async (user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((error) => {
          return done(error, false);
        });
    })
  );
};
