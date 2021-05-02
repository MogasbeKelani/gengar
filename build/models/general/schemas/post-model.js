"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema({
    creator: { type: String, ref: "user", required: true },
    threadId: { type: String, ref: "thread", required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model("post", Post);
