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
// @ts-ignore // not typescript-ified yet
const express = require("express");
const threads_1 = require("../../controllers/discussions/threads");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.get("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield threads_1.getById(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.post("/make", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        if (!req.body.title || !req.body.post) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        var discussionFormatted = req.body;
        //discussionFormatted.creator = req.user.first_name + req.user.last_name;
        const forum = yield threads_1.createThread(discussionFormatted);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.delete("/delete/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield threads_1.deleteDiscussion(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.patch("/update", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body._id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield threads_1.updateDiscussion(req.body);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
