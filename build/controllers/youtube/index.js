"use strict";
// const searchRequest,searchResponse = require("./../../models/youtube");
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
exports.utubeSearch = void 0;
var { google } = require("googleapis");
const client = google.youtube({
    version: "v3",
    auth: configs.utube.apikey,
});
/**
 * @param searchRequest
 * @return searchResponse
 */
const utubeSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var numResults = req.query.resultsSize || 3;
        const results = yield client.search.list({
            part: "snippet",
            type: "video",
            maxResults: numResults,
            order: "relevance",
            q: req.query.query,
        });
        res.status(200).json(results.data.items);
    }
    catch (_a) {
        res.status(404).json({ message: "Something went wrong" });
    }
});
exports.utubeSearch = utubeSearch;
