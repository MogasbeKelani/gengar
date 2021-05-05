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
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        cb: any
      ) {
        //cb is callback

        const newUser = {
          google_id: profile.id,
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          image: profile.photos[0].value,
          create_date: Date.now(),
          update_date: Date.now(),
        };

        try {
          let user = await client
            .db("GitGud")
            .collection("user")
            .findOne({ google_id: profile.id });
          console.log(user);
          //user exist in the db
          if (user) {
            cb(null, user);
          } else {
            user = await client
              .db("GitGud")
              .collection("user")
              .insertOne(newUser);
            console.log(user);
            cb(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser(function (user: any, done: any) {
    done(null, user);
  });

  passport.deserializeUser(function (user: any, done: any) {
    done(null, user);
  });
};
