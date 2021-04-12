"use strict";
// @ts-ignore // not typescript-ified yet
const express = require("express");
const utube = require("../../controllers/youtube");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
const youtube = router;
youtube.get("/search", utube.utubeSearch);
module.exports = youtube;
