// @ts-ignore // not typescript-ified yet
const express = require("express");

const youtube = require("../../controllers/youtube");

// @ts-ignore // not typescript-ified yet
const router = express.Router();

router.get("/search", async (req: any, res: any) => {
  try {
    console.log(req.user);
    const searchResults = await youtube.search({
      resultsSize: req.query.resultsSize,
      query: req.query.query,
    });
    res.send({
      searchResults,
    });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
