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
// @ts-ignore // not typescript-ified yet
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
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
 * @param _id of the user you want to patch
 * @returns updated user
 */
router.patch("/update", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body._id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const user = yield index_1.updateUser(req.body);
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
router.delete("/delete/:id", jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            res.status(400).json({ message: "Missing Params" });
            return;
        }
        const user = yield index_1.deleteUser(req.params.id);
        res.send(user);
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
