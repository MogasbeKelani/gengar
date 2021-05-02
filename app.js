const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const fs = require("fs");
const yaml = require("js-yaml");
const apiPort = 5000;
const bodyParser = require("body-parser");
// create application/json parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Sets up the config YAML
configs = yaml.load(fs.readFileSync("./config/ci.yaml", "utf8"));

//SSO Configurations
const passport = require("passport");
require("./build/controllers/sso/passport-setup")(passport);
const sso = require("./build/routes/google");
const session = require("express-session");

// Connects to Database
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(cors());
app.use(express.json());

// Session Key
app.use(
  session({
    secret: "some secret goes here",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport Middleware
//IMPORTANT: When the server restart(this include being restart by nodemon) it will destory all the current session so be mindful of that
app.use(passport.initialize());
app.use(passport.session());

// Endpoints and their Imports

const utube = require("./build/routes/youtube");
const leetcode = require("./build/routes/leetcode");
const isAuth = require("./build/routes/isAuth");
const discussion = require("./build/routes/discussions");
const users = require("./build/routes/users");
const threads = require("./build/routes/threads");
const posts = require("./build/routes/posts");

app.use("/google", sso);
app.use("/api/youtube", utube);
app.use("/api/leetcode", leetcode);
app.use("/api/auth", isAuth);
app.use("/api/discussions", discussion);
app.use("/api/users", users);
app.use("/api/threads", threads);
app.use("/api/posts", posts);

app.listen(apiPort, function () {
  return console.log("Server running on port " + apiPort);
});
