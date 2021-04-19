import {
  problemList,
  singleProblemRequest,
  singleProblemResponse,
} from "./../../models/leetcode";

const fetch = require("node-fetch");

/**
 * @return A list of leetcode problems
 */
export async function allQuestions(): Promise<problemList> {
  try {
    const allProblems = await fetch("https://leetcode.com/api/problems/all/", {
      mode: "cors",
    })
      .then(function(response: any) {
        return response.json();
      })
      .catch(function(error: any) {
        console.log("Request failed", error);
      });
    const problemCrunch = allProblems.stat_status_pairs.map(function(x: any) {
      return {
        title: x.stat.question__title,
        questionTitleSlug: x.stat.question__title_slug,
        difficulty: x.difficulty.level,
      };
    });
    return problemCrunch;
  } catch (err) {
    throw err;
  }
}

/**
 * @param singleProblemRequest This is the Title Slug
 * @return singleProblemResponse Full Info of a leetcode problem
 */
export async function singleQuestion(
  title: singleProblemRequest,
): Promise<singleProblemResponse> {
  try {
    const singleProblem = await fetch("https://leetcode.com/graphql", {
      headers: {
        "content-type": "application/json",
      },
      body:
        configs.leetcode.query.P1 +
        title.questionTitleSlug +
        configs.leetcode.query.P2,

      method: "POST",
      mode: "cors",
    })
      .then(function(response: any) {
        return response.json();
      })
      .catch(function(error: any) {
        console.log("Request failed", error);
      });

    const singleProblemCrunch = {
      title: singleProblem.data.question.title,
      questionTitleSlug: singleProblem.data.question.titleSlug,
      content: singleProblem.data.question.content,
      difficulty: singleProblem.data.question.difficulty,
      likes: singleProblem.data.question.likes,
      dislikes: singleProblem.data.question.dislikes,
      stats: JSON.parse(singleProblem.data.question.stats || "[]"),
      topicTags: (singleProblem.data.question.topicTags || []).map(
        (x: any) => x.name,
      ),
      languages: (singleProblem.data.question.codeSnippets || []).map(
        (x: any) => x.lang,
      ),
    };
    return singleProblemCrunch;
  } catch (err) {
    throw err;
  }
}
