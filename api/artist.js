const artistRepo = require('../repositories/artist.repository');

module.exports = async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            if (req.query.id) {
                await artistRepo.getArtistById(req, res);
            } else {
                await artistRepo.getAllArtists(req, res);
            }
            break;
        case 'POST':
            await artistRepo.createArtist(req, res);
            break;
        case 'PUT':
            await artistRepo.updateArtist(req, res);
            break;
        case 'DELETE':
            await artistRepo.deleteArtist(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};