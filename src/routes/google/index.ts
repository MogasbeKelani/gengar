// @ts-ignore // not typescript-ified yet
const express = require("express");

// @ts-ignore // not typescript-ified yet
const router = express.Router();

const passport = require("passport");

const googleSSO = router;

googleSSO.get("/auth", passport.authenticate("google", { scope: ["profile"] }));

// when fail it will redirect to home login page
googleSSO.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "https://guarded-eyrie-22453.herokuapp.com/sign-in",
  }),
  function (req: any, res: any) {
    // redirect to home
    res.redirect("https://guarded-eyrie-22453.herokuapp.com/");
  }
);

googleSSO.get("/auth/logout", (req: any, res: any) => {
  req.logout();
  res.redirect("https://guarded-eyrie-22453.herokuapp.com/sign-in"); // will redirect to login in page when logged out
});

module.exports = googleSSO;
