const userRepo = require('../repositories/user.repository');

module.exports = async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            if (req.query.email) {
                await userRepo.getUserByEmail(req, res);
            } else if (req.query.plans) {
                await userRepo.getUserPlans(req, res);
            } else {
                await userRepo.getAllUser(req, res);
            }
            break;
        case 'POST':
            if (req.query.login) {
                await userRepo.login(req, res);
            } else if (req.query.addPlan) {
                await userRepo.addUserPlan(req, res);
            } else {
                await userRepo.addUser(req, res);
            }
            break;
        case 'PUT':
            if (req.query.updateFullname) {
                await userRepo.updateFullname(req, res);
            } else if (req.query.updatePassword) {
                await userRepo.updatePassword(req, res);
            }
            break;
        case 'DELETE':
            await userRepo.deleteUser(req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};