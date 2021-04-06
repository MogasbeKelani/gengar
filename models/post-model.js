const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema(
    {   
        user: {type: Schema.Types.ObjectId, ref: "user", required: true},
        thread: {type: Schema.Types.ObjectId, ref: "thread" , required: true},
        text: {type: String, required: true, required: true },
        time : { type : Date, default: Date.now }
    },
    { timestamps: true },
)

module.exports = mongoose.model('post', Post)