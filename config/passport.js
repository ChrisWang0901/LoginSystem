const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const config = require("config");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(
    new LocalStrategy((email, password, done) => {
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        console.log(user);
        const verified = await bcrypt.compare(password, user.password);
        if (!verified) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  // Google Oauth Startegy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.get("GoogleClientID"),
        clientSecret: config.get("GoogleSecret"),
        callbackURL: "/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }, async (err, user) => {
          try {
            if (err) {
              cb(err, null);
            }
            if (!user) {
              const user = new User({
                name: profile.displayName,
                email: `${profile.displayName}@gmail.com`,
                password: `${profile.id}`,
                googleId: profile.id,
              });
              user.save();
            }
            console.log(profile);
            return cb(err, user);
          } catch (error) {
            console.error(error);
          }
        });
      }
    )
  );

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.get("FacebookClientID"),
        clientSecret: config.get("FacebookSecret"),
        callbackURL: "/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOne({ googleId: profile.id }, async (err, user) => {
          try {
            if (err) {
              cb(err, null);
            }
            if (!user) {
              const user = new User({
                name: profile.displayName,
                email: `${profile.displayName}@gmail.com`,
                password: `${profile.id}`,
                googleId: profile.id,
              });
              user.save();
            }
            console.log(profile);
            return cb(err, user);
          } catch (error) {
            console.error(error);
          }
        });
      }
    )
  );
};
