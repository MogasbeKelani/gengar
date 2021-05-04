"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const GOOGLE_CLIENT_ID = configs.googleSSO.id;
const GOOGLE_CLIENT_SECRET = configs.googleSSO.secret;
let GoogleStrategy = require("passport-google-oauth20").Strategy;
module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/google/auth/callback",
    }, function (accessToken, refreshToken, profile, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            //cb is callback
            const newUser = {
                google_id: profile.id,
                first_name: profile.name.givenName,
                last_name: profile.name.familyName,
                image: profile.photos[0].value,
            };
            try {
                let user = yield client
                    .db("GitGud")
                    .collection("user")
                    .findOne({ google_id: profile.id });
                console.log(user);
                //user exist in the db
                if (user) {
                    cb(null, user);
                }
                else {
                    user = yield client
                        .db("GitGud")
                        .collection("user")
                        .insertOne(newUser);
                    console.log(user);
                    cb(null, user);
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};
