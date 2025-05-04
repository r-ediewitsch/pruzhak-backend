const Ticket = require('../models/TicketModel');

async function getAllTickets(req, res) {
    try {
        const tickets = await Ticket.find()
            .populate('concert')
            .populate('user');
        res.status(200).json({ success: true, message: "Found all tickets", data: tickets });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getUserTickets(req, res) {
    try {
        const tickets = await Ticket.find({ user: req.params.userId })
            .populate('concert');
        res.status(200).json({ success: true, message: "Found user tickets", data: tickets });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function createTicket(req, res) {
    try {
        // Access form data from req.body directly
        const concert = req.body.concert;
        const user = req.body.user;
        const seating = req.body.seating;
        const seat = req.body.seat;
        
        if (!concert || !user || !seating || !seat) {
            throw new Error("All fields (concert, user, seating, seat) are required");
        }

        const ticket = new Ticket({
            concert,
            user,
            seating,
            seat
        });

        await ticket.save();
        
        const populatedTicket = await Ticket.findById(ticket._id)
            .populate('concert')
            .populate('user');

        res.status(200).json({ 
            success: true, 
            message: "Successfully booked ticket", 
            data: populatedTicket 
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getTicketById(req, res) {
    try {
        const ticket = await Ticket.findById(req.params.ticketId)
            .populate('concert')
            .populate('user');
        
        if (!ticket) throw new Error("Ticket not found");

        res.status(200).json({ success: true, message: "Found ticket", data: ticket });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function updateTicket(req, res) {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.ticketId,
            req.body,
            { new: true }
        )
        .populate('concert')
        .populate('user');

        if (!ticket) throw new Error("Ticket not found");

        res.status(200).json({ success: true, message: "Successfully updated ticket", data: ticket });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function deleteTicket(req, res) {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.ticketId);
        if (!ticket) throw new Error("Ticket not found");

        res.status(200).json({ success: true, message: "Successfully cancelled ticket" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function checkSeatAvailability(req, res) {
    try {
        const { concertId, seatNumber } = req.params;
        console.log(`Checking seat ${seatNumber} for concert ${concertId}`);
        
        const existingTicket = await Ticket.findOne({
            concert: concertId,
            seat: seatNumber
        });

        const available = !existingTicket;
        console.log(`Seat ${seatNumber} is ${available ? 'available' : 'taken'}`);

        res.status(200).json({ 
            success: true, 
            available,
            message: available ? 'Seat is available' : 'Seat is already taken'
        });
    } catch (err) {
        console.log(`Error checking seat availability: ${err.message}`);
        res.status(400).json({ 
            success: false, 
            available: false,
            message: err.message 
        });
    }
}

module.exports = {
    getAllTickets,
    getUserTickets,
    createTicket,
    getTicketById,
    updateTicket,
    deleteTicket,
    checkSeatAvailability
};
