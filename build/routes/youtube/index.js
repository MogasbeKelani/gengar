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
const youtube = require("../../controllers/youtube");
// @ts-ignore // not typescript-ified yet
const router = express.Router();
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.session, req.user);
        const searchResults = yield youtube.search({
            resultsSize: req.query.resultsSize,
            query: req.query.query,
        });
        res.send({
            searchResults,
        });
    }
    catch (err) {
        throw err;
    }
}));
module.exports = router;
