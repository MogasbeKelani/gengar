"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Thread = new Schema({
    creator: { type: String, ref: "user", required: true },
    forumId: { type: String, ref: "forum", required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model("thread", Thread);
