const express = require("express");
const ticketRepo = require("../repositories/ticket.repository");
const router = express.Router();

// Put specific routes before parameterized routes
router.get("/check-seat/:concertId/:seatNumber", ticketRepo.checkSeatAvailability);
router.get("/user/:userId", ticketRepo.getUserTickets);

// General routes
router.get("/", ticketRepo.getAllTickets);
router.post("/", ticketRepo.createTicket);

// ID-based routes
router.get("/:ticketId", ticketRepo.getTicketById);
router.put("/:ticketId", ticketRepo.updateTicket);
router.delete("/:ticketId", ticketRepo.deleteTicket);

module.exports = router;
