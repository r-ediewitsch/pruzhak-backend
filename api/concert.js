const concertRepo = require('../repositories/concert.repository');
const multer = require('multer');
const upload = multer();

module.exports = async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            if (req.query.id) {
                await concertRepo.getConcertById(req, res);
            } else {
                await concertRepo.getAllConcerts(req, res);
            }
            break;
        case 'POST':
            upload.single('coverImage')(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ success: false, message: err.message });
                }
                await concertRepo.createConcert(req, res);
            });
            break;
        case 'PUT':
            await concertRepo.updateConcert(req, res);
            break;
        case 'DELETE':
            await concertRepo.deleteConcert(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};