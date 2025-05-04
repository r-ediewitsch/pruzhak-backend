const Artist = require('../models/ArtistModel');

async function getAllArtists(req, res) {
    try {
        const artists = await Artist.find();
        res.status(200).json({ success: true, message: "Found all artists", data: artists });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getArtistById(req, res) {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) throw new Error("Artist not found");
        
        res.status(200).json({ success: true, message: "Found artist", data: artist });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function createArtist(req, res) {
    try {
        const { name, role, description } = req.body;
        const artist = new Artist({ name, role, description });
        await artist.save();

        res.status(200).json({ success: true, message: "Successfully created artist", data: artist });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function updateArtist(req, res) {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!artist) throw new Error("Artist not found");

        res.status(200).json({ success: true, message: "Successfully updated artist", data: artist });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function deleteArtist(req, res) {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) throw new Error("Artist not found");

        res.status(200).json({ success: true, message: "Successfully deleted artist", data: artist });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

module.exports = {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
};
