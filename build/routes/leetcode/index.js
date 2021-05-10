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
// @ts-ignore // not typescript-ified yet
const express = require("express");
const leetcode = require("../../controllers/leetcode");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
router.get("/questions/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProblems = yield leetcode.allQuestions();
        res.send({
            allProblems,
        });
    }
    catch (err) {
        throw err;
    }
}));
router.get("/questions/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProblems = yield leetcode.singleQuestion({
            questionTitleSlug: req.params.name,
        });
        res.send({
            allProblems,
        });
    }
    catch (err) {
        throw err;
    }
}));
router.get("/questions/topic/:topic", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProblems = yield leetcode.allQuestionsTopic(req.params.topic);
        res.send({
            allProblems,
        });
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
