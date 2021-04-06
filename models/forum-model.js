const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Forum = new Schema(

    {
        //Each coding question will have it own forum for discussion
        //the name of the forum was be the name of the question that is pull from api
        name: { type: String, required: true },
        //Each forum can many threads
        threads: [{type: Schema.Types.ObjectId, ref: 'thread'}],

    },
    { timestamps: true },

)

module.exports = mongoose.model('forum', Forum)
