const musicRepo = require('../repositories/music.repository');

module.exports = async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            if (req.query.id) {
                await musicRepo.getMusicById(req, res);
            } else {
                await musicRepo.getAllMusic(req, res);
            }
            break;
        case 'POST':
            await musicRepo.createMusic(req, res);
            break;
        case 'PUT':
            await musicRepo.updateMusic(req, res);
            break;
        case 'DELETE':
            await musicRepo.deleteMusic(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};