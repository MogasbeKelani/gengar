// const searchRequest,searchResponse = require("./../../models/leetcode");
const fetch = require("node-fetch");

/**
 * @return A
 */
const allQuestions = async (req: any, res: any) => {
  try {
    const allProblems = await fetch("https://leetcode.com/api/problems/all/", {
      mode: "cors",
    })
      .then(function (response: any) {
        return response.json();
      })
      .catch(function (error: any) {
        console.log("Request failed", error);
      });
    res.status(200).json(allProblems);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const singleQuestion = async (req: any, res: any) => {
  try {
    const allProblems = await fetch("https://leetcode.com/graphql", {
      headers: {
        "content-type": "application/json",
      },
      referrer: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
      body:
        configs.leetcode.query.P1 + "happy-number" + configs.leetcode.query.P2,

      method: "POST",
      mode: "cors",
    })
      .then(function (response: any) {
        return response.json();
      })
      .catch(function (error: any) {
        console.log("Request failed", error);
      });
    res.status(200).json(allProblems);
  } catch {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export { allQuestions, singleQuestion };
