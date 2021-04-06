const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Thread = new Schema(
    {

        creator: {type: Schema.Types.ObjectId, ref: "user", required: true},
        forum: {type: Schema.Types.ObjectId, ref: "forum", required: true},
        title: { type: String, required: true },
        post: [{type: Schema.Types.ObjectId, ref: "post"}],

    },
    { timestamps: true },
)

module.exports = mongoose.model('thread', Thread)