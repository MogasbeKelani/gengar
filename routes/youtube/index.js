const express = require("express");

const utube = require("../../controllers/youtube");

const router = express.Router();

youtube = router;

youtube.get("/youtube/search", utube.utubeSearch);

module.exports = youtube;
