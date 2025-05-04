const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        composer: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
