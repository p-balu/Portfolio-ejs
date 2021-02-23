const LocalStrategy = require("passport-local").Strategy;

// Load User model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      (username, password, done) => {
        // Match user
        User.findOne({
          username: username,
        }).then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That username or password is incorrect",
            });
          }
          if (user && password !== user.password) {
            return done(null, false, {
              message: "Incorrect Password",
            });
          }
          return done(null, user);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
