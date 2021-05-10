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
exports.search = void 0;
const { google } = require("googleapis");
const client = google.youtube({
    version: "v3",
    auth: configs.utube.apikey,
});
/**
 * @param searchRequest
 * @return searchResponse
 */
function search(options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const numResults = options.resultsSize || 3;
            const results = yield client.search.list({
                part: "snippet",
                type: "video",
                maxResults: numResults,
                order: "relevance",
                q: options.query,
            });
            return results.data.items;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.search = search;
