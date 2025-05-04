const ticketRepo = require('../repositories/ticket.repository');

module.exports = async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            if (req.query.userId) {
                await ticketRepo.getUserTickets(req, res);
            } else if (req.query.checkSeat) {
                await ticketRepo.checkSeatAvailability(req, res);
            } else if (req.query.id) {
                await ticketRepo.getTicketById(req, res);
            } else {
                await ticketRepo.getAllTickets(req, res);
            }
            break;
        case 'POST':
            await ticketRepo.createTicket(req, res);
            break;
        case 'PUT':
            await ticketRepo.updateTicket(req, res);
            break;
        case 'DELETE':
            await ticketRepo.deleteTicket(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};