import mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Forum = new Schema(
  {
    creator: { type: String, ref: "user", required: true }, //userID
    title: { type: String, required: true },
    description: { type: String, required: true },
    topics: [{ type: String }],
    creatorName: { type: String, ref: "user", required: true }, //userName
  },
  { timestamps: true }
);

module.exports = mongoose.model("forum", Forum);
