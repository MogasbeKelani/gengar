"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleQuestion = exports.allQuestions = void 0;
const fetch = require("node-fetch");
/**
 * @return A list of leetcode problems
 */
function allQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allProblems = yield fetch("https://leetcode.com/api/problems/all/", {
                mode: "cors",
            })
                .then(function (response) {
                return response.json();
            })
                .catch(function (error) {
                console.log("Request failed", error);
            });
            var problemCrunch = allProblems["stat_status_pairs"].map(function (x) {
                return {
                    title: x.stat["question__title"],
                    questionTitleSlug: x.stat["question__title_slug"],
                    difficulty: x.difficulty.level,
                };
            });
            return problemCrunch;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.allQuestions = allQuestions;
/**
 * @param singleProblemRequest This is the Title Slug
 * @return singleProblemResponse Full Info of a leetcode problem
 */
function singleQuestion(title) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const singleProblem = yield fetch("https://leetcode.com/graphql", {
                headers: {
                    "content-type": "application/json",
                },
                body: configs.leetcode.query.P1 +
                    title.questionTitleSlug +
                    configs.leetcode.query.P2,
                method: "POST",
                mode: "cors",
            })
                .then(function (response) {
                return response.json();
            })
                .catch(function (error) {
                console.log("Request failed", error);
            });
            var singleProblemCrunch = {
                title: singleProblem.data.question.title,
                questionTitleSlug: singleProblem.data.question.titleSlug,
                content: singleProblem.data.question.content,
                difficulty: singleProblem.data.question.difficulty,
                likes: singleProblem.data.question.likes,
                dislikes: singleProblem.data.question.dislikes,
                stats: JSON.parse(singleProblem.data.question.stats || "[]"),
                topicTags: (singleProblem.data.question.topicTags || []).map((x) => x.name),
                languages: (singleProblem.data.question.codeSnippets || []).map((x) => x.lang),
            };
            return singleProblemCrunch;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.singleQuestion = singleQuestion;
