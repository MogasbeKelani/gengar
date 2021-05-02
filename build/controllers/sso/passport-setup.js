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
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../../models/general/models/user-model");
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
                let user = yield User.findOne({ google_id: profile.id });
                //user exist in the db
                if (user) {
                    cb(null, user);
                }
                else {
                    user = yield User.create(newUser);
                    cb(null, user);
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
