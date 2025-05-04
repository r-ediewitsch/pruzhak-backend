const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema(
    {
        coverImage: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        programme: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Music",
            required: true,
        }],
        artists: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
            required: true,
        }],
        date: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Concert = mongoose.model("Concert", concertSchema);

module.exports = Concert;

