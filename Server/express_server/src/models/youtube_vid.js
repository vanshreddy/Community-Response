const mongoose = require('mongoose');

const youtube_schema = new mongoose.Schema(
    {
        Unique_id: {
            type :String,
            required :true,
            trim : true
        },

        Positive_Comments: {
            type: Number,
            required: true,
        },
        Negative_Comments: {
            type: Number,
            required: true,
        },
        Neutral_Comments: {
            type: Number,
            required: true,
        },

    },
    {timestamps:true}
)


const youtube = mongoose.model('youtube',youtube_schema,"ALL_DATA")

module.exports = youtube