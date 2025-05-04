const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema(
    {
        concert: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Concert",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seating: {
            type: String,
            enum: ['gold', 'silver', 'regular', 'student'],
            required: true,
        },
        seat: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
