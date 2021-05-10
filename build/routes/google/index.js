"use strict";
// @ts-ignore // not typescript-ified yet
const express = require("express");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
const passport = require("passport");
const googleSSO = router;
googleSSO.get("/auth", passport.authenticate("google", { scope: ["profile"] }));
// when fail it will redirect to home login page
googleSSO.get("/auth/callback", passport.authenticate("google", {
    failureRedirect: "/sign-in",
}), function (req, res) {
    // redirect to home
    res.redirect("/");
});
googleSSO.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect("/sign-in"); // will redirect to login in page when logged out
});
module.exports = googleSSO;
