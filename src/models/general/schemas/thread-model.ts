import mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Thread = new Schema(
  {
    creator: { type: String, ref: "user", required: true }, //userID
    forumId: { type: String, ref: "forum", required: true },
    text: { type: String, required: true },
    time: { type: Date, default: Date.now },
    creatorName: { type: String, ref: "user", required: true }, //userName
  },
  { timestamps: true }
);

module.exports = mongoose.model("thread", Thread);
