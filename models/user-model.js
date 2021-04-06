const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        google_id: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        image: { type: String, required: true },
        threadCreated: [{type: Schema.Types.ObjectId, ref: 'thread'}],
        postMade: [{type: Schema.Types.ObjectId, ref: "post"}],
    },
    { timestamps: true },
)

module.exports = mongoose.model('user', User)