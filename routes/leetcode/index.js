const express = require("express");
const leetcode = require("../../controllers/leetcode");
const router = express.Router();

lc = router;
lc.get("/questions/all", leetcode.allQuestions);
lc.get("/questions/name", leetcode.singleQuestion);

module.exports = lc;
