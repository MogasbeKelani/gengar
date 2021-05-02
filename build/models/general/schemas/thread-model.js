"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Thread = new Schema({
    creator: { type: String, ref: "user", required: true },
    forumId: { type: String, ref: "forum", required: true },
    title: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model("thread", Thread);
