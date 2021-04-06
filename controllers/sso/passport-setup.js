const mongoose = require('mongoose');
const User = require('../../models/user-model');

const GOOGLE_CLIENT_ID = config.googleSSO.id;
const GOOGLE_CLIENT_SECRET = config.googleSSO.sercret;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
    passport.use (
        new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/google/auth/callback"
          },
          async function(accessToken, refreshToken, profile, cb) { //cb is callback
            
            console.log(profile);

            const newUser = {
                google_id : profile.id,
                first_name : profile.name.givenName,
                last_name : profile.name.familyName,
                image: profile.photos[0].value,
            }
            
            try {

                let user = await User.findOne({google_id : profile.id});

                //user exist in the db
                if(user) {
                    cb(null, user);
                } else {
                    user = await User.create(newUser);
                    cb(null, user);
                }

            } catch(err) {
                console.error(err);
            }
          }
    ))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
    });
}
