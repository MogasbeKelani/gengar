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
const posts_1 = require("../../controllers/posts");
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
        const forum = yield posts_1.getPostById(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * @param creator for a discussion user._id
 */
router.get("/thread/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield posts_1.getPostByThreadId(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.post("/create", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.text || !req.body.threadId) {
            res.status(400).json({ message: "Empty Text" });
            return;
        }
        if ((!req.user || !req.user._id) && !req.body.creator) {
            res.status(400).json({ message: "User has not signed In" });
            return;
        }
        var postFormatted = req.body;
        if (!req.body.creator) {
            postFormatted.creator = req.user._id;
        }
        const forum = yield posts_1.createPost(postFormatted);
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
        const forum = yield posts_1.deletePost(req.params.id);
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
        const forum = yield posts_1.updatePost(req.body);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
