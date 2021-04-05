const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./db");
const path = require("path");
const movieRouter = require("./routes/test/test-route.js");
const fs = require("fs");
const yaml = require("js-yaml");
global.config = yaml.load(fs.readFileSync("./config/ci.yaml", "utf8"));
const utube = require("./routes/youtube");

//google ssso stuff
const passport = require('passport');
require('./controllers/sso/passport-setup')(passport);
const sso = require("./routes/google");
const session = require('express-session')

const apiPort = 5000;

app.use(cors());
app.use(express.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

// session
app.use(session({
    secret: 'some secret goes here',
    resave: false,
    saveUninitialized: false
}))

//passport middleware
//IMPORTANT: When the server restart(this include being restart by nodemon) it will destory all the current session so be mindful of that
app.use(passport.initialize());
app.use(passport.session());

app.use("/google", sso);

app.use("/api/test", movieRouter);

app.use("/api", utube);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
