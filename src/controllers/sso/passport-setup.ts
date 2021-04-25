import mongoose = require("mongoose");
import { UserModelFunctions } from "../../models/general/models/user-model-functions";
const User: UserModelFunctions = require("../../models/general/user-model");

const GOOGLE_CLIENT_ID = configs.googleSSO.id;
const GOOGLE_CLIENT_SECRET = configs.googleSSO.sercret;
let GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport: any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/auth/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) {
        const newUser = {
          google_id: profile.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ google_id: profile.id });
          if (user) {
            console.log("User exist:", user);
            cb(null, user);
          } else {
            console.log("User doesn't exist");
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
