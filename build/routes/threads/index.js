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
const threads_1 = require("../../controllers/threads");
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
router.get("/forum/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield threads_1.getByForumId(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.get("/user/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const forum = yield threads_1.getThreadByUserId(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.post("/create", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.text) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        if ((!req.user || !req.user._id) && !req.body.creator) {
            res.status(400).json({ message: "User has not signed In" });
            return;
        }
        var threadFormatted = req.body;
        if (!req.body.creator) {
            threadFormatted.creator = req.user._id;
        }
        const forum = yield threads_1.createThread(threadFormatted);
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
        const forum = yield threads_1.deletethread(req.params.id);
        res.send(forum);
    }
    catch (err) {
        throw err;
    }
}));
router.patch("/update/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        var threadFormatted = req.body;
        threadFormatted._id = req.params.id;
        const thread = yield threads_1.updatethread(threadFormatted);
        res.send(thread);
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
