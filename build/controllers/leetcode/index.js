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
// const searchRequest,searchResponse = require("./../../models/leetcode");
const fetch = require("node-fetch");
/**
 * @return A
 */
const allQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.status(200).json(allProblems);
    }
    catch (_a) {
        res.status(404).json({ message: "Something went wrong" });
    }
});
exports.allQuestions = allQuestions;
const singleQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProblems = yield fetch("https://leetcode.com/graphql", {
            headers: {
                "content-type": "application/json",
            },
            referrer: "https://leetcode.com/problems/bitwise-and-of-numbers-range/",
            body: configs.leetcode.query.P1 + "happy-number" + configs.leetcode.query.P2,
            method: "POST",
            mode: "cors",
        })
            .then(function (response) {
            return response.json();
        })
            .catch(function (error) {
            console.log("Request failed", error);
        });
        res.status(200).json(allProblems);
    }
    catch (_b) {
        res.status(404).json({ message: "Something went wrong" });
    }
});
exports.singleQuestion = singleQuestion;
