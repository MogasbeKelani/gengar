"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Forum = new Schema({
    creator: { type: String, ref: "user", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    topics: [{ type: String }],
}, { timestamps: true });
module.exports = mongoose.model("forum", Forum);
