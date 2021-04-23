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
const index_1 = require("../../controllers/discussions/index");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
router.get("/all", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forum = yield index_1.getDiscussions();
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.get("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield index_1.getDiscussionById(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.get("/topic/:topic", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.topic) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield index_1.getDiscussionByTopic(req.params.topic);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.post("/create", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.title || !req.body.description) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "User has not signed In" });
            return;
        }
        var discussionFormatted = req.body;
        discussionFormatted.creator = req.user._id;
        const forum = yield index_1.createDiscussion(req.body);
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
        const forum = yield index_1.updateDiscussion(req.body);
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
        const forum = yield index_1.deleteDiscussion(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
