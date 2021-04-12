// @ts-ignore // not typescript-ified yet
const express = require("express");

const leetcode = require("../../controllers/leetcode");

// @ts-ignore // not typescript-ified yet
const router = express.Router();

const lc = router;
lc.get("/questions/all", leetcode.allQuestions);
lc.get("/questions/name", leetcode.singleQuestion);

module.exports = lc;
