const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
