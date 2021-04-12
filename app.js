var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");
var db = require("./db");
var path = require("path");
var fs = require("fs");
var yaml = require("js-yaml");
app.use(cors());
configs = yaml.load(fs.readFileSync("./config/ci.yaml", "utf8"));
var utube = require("./build/routes/youtube");
var leetcode = require("./build/routes/leetcode");
var apiPort = 5000;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use("/api/youtube", utube);
app.use("/api/leetcode", leetcode);
app.listen(apiPort, function () {
  return console.log("Server running on port " + apiPort);
});

//google ssso stuff
const passport = require("passport");
require("./build/controllers/sso/passport-setup")(passport);
const sso = require("./build/routes/google");
const session = require("express-session");

app.use(express.json());

// session
app.use(
  session({
    secret: "some secret goes here",
    resave: false,
    saveUninitialized: false,
  })
);

//passport middleware
//IMPORTANT: When the server restart(this include being restart by nodemon) it will destory all the current session so be mindful of that
app.use(passport.initialize());
app.use(passport.session());

app.use("/google", sso);
