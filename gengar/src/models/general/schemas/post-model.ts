import mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    creator: { type: String, ref: "user", required: true }, //userID
    threadId: { type: String, ref: "thread", required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", Post);
