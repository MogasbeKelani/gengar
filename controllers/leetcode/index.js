// const searchRequest,searchResponse = require("./../../models/leetcode");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);
const fetch = require("node-fetch");

/**
 * @return A
 */
allQuestions = async (req, res) => {
  try {
    const allProblems = await fetch("https://leetcode.com/api/problems/all/", {
      mode: "cors",
    })
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        log("Request failed", error);
      });
    res.status(200).json(allProblems);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
};

singleQuestion = async (req, res) => {
  try {
    const allProblems = await fetch("https://leetcode.com/graphql", {
      headers: {
        "content-type": "application/json",
      },
      referrer: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
      body:
        global.myvar.leetcode.query.P1 +
        "happy-number" +
        global.myvar.leetcode.query.P2,

      method: "POST",
      mode: "cors",
    })
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        log("Request failed", error);
      });
    res.status(200).json(allProblems);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  allQuestions,
  singleQuestion,
};
