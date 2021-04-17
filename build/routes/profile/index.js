"use strict";
// @ts-ignore // not typescript-ified yet
const express = require("express");
const dbusers = require("../../controllers/profile");

// @ts-ignore // not typescript-ified yet
const router = express.Router();
const users = router;
users.get('/:id', dbusers.userProfile);

module.exports = users;
