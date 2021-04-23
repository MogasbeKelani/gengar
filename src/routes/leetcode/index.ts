// @ts-ignore // not typescript-ified yet
const express = require("express");

const leetcode = require("../../controllers/leetcode");

// @ts-ignore // not typescript-ified yet
const router = express.Router();

router.get("/questions/all", async (req: any, res: any) => {
  try {
    const allProblems = await leetcode.allQuestions();
    res.send({
      allProblems,
    });
  } catch (err) {
    throw err;
  }
});

router.get("/questions/:name", async (req: any, res: any) => {
  try {
    const allProblems = await leetcode.singleQuestion({
      questionTitleSlug: req.params.name,
    });
    res.send({
      allProblems,
    });
  } catch (err) {
    throw err;
  }
});

router.get("/questions/:topics", async (req: any, res: any) => {
  try {
    const allProblems = await leetcode.singleQuestion({
      questionTitleSlug: req.params.name,
    });
    res.send({
      allProblems,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
