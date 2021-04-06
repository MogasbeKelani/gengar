const express = require("express");
const passport = require('passport');
const router = express.Router();

googleSSO = router;

googleSSO.get('/auth', passport.authenticate('google', { scope: ['profile'] }));

googleSSO.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/fail' }),
  function(req, res) {
    // Successful authentication, redirect home.
    // Dont know the what the homepage is for the frontend
    res.redirect('/');
});

googleSSO.get('/auth/logout', (req, res) => {

  req.logout();
  res.redirect('/loggedOut'); //Dont know where to redirect the user after logout

})

module.exports = googleSSO;