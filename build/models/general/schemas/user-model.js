"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
    google_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    image: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model("user", User);
