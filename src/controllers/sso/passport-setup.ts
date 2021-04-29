import mongoose = require("mongoose");
import { UserModelFunctions } from "../../models/general/models/user-model-functions";
const User: UserModelFunctions = require("../../models/general/user-model");

const GOOGLE_CLIENT_ID = configs.googleSSO.id;
const GOOGLE_CLIENT_SECRET = configs.googleSSO.secret;
let GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport: any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/auth/callback",
      },
      async function (accessToken, refreshToken, profile, cb) {
        //cb is callback

        console.log(profile);

        const newUser = {
          google_id: profile.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ google_id: profile.id });

          //user exist in the db
          if (user) {
            console.log("User exist");
            cb(null, user);
          } else {
            console.log("User doesn't exist", user);
            user = await User.create(newUser);
            cb(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser(function (user: any, done: any) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id: any, done: any) {
    User.findById(id, function (err: any, user: any) {
      done(err, user);
    });
  });
};
