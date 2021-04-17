"use strict";
// @ts-ignore // not typescript-ified yet
const express = require("express");
const dbusers = require("../../controllers/users");

// @ts-ignore // not typescript-ified yet
const router = express.Router();
const users = router;
users.get("/list", dbusers.userList);

module.exports = users;
