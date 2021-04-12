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
