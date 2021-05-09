module.exports = {
  //ADD THESE MIDDLEWARE TO PROTECTED ROUTE
  doAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("https://guarded-eyrie-22453.herokuapp.com/sign-in"); //it will redirect the user to login page if they arent looking or not auth
    }
  },
};
