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
const index_1 = require("../../controllers/users/index");
const index_2 = require("../../controllers/discussions/index");
const index_3 = require("../../controllers/threads/index");
const index_4 = require("../../controllers/posts/index");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
/**
 * @param _id for a user
 */
router.get("/self", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "Not Signed In" });
            return;
        }
        console.log(req.user);
        const user = yield index_1.getUserById(req.user._id);
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * @param _id for a user
 */
router.get("/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const user = yield index_1.getUserById(req.params.id);
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * Get all for everything ever
 */
router.get("/comments/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const threads = yield index_3.getThreadByUserId(req.params.id);
        const posts = yield index_4.getPostByUserId(req.params.id);
        var user = threads.concat(posts);
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * Get all for everything ever
 */
router.get("/self/comments", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "Not Signed In" });
            return;
        }
        const threads = yield index_3.getThreadByUserId(req.user._id);
        const posts = yield index_4.getPostByUserId(req.user._id);
        var user = threads.concat(posts);
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * @param creator for the discussions
 */
router.get("/discussions/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield index_2.getDiscussionByUserId(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * @param creator for the discussions
 */
router.get("/self/discussions/", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "Not Signed In" });
            return;
        }
        const forum = yield index_2.getDiscussionByUserId(req.user._id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * @param _id of the user you want to patch
 * @returns updated user
 */
router.patch("/update/", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "Not Sign in" });
            return;
        }
        const formatUser = req.body;
        formatUser._id = req.user._id;
        const user = yield index_1.updateUserAttribute(formatUser);
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}));
/**
 * @param _id of the user you want to delete
 * @returns success boolean
 */
router.delete("/delete/", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const user = yield index_1.deleteUser(req.user._id);
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
