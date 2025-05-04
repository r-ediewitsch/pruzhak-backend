const Music = require('../models/MusicModel');

async function getAllMusic(req, res) {
    try {
        const music = await Music.find();
        res.status(200).json({ success: true, message: "Found all music", data: music });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getMusicById(req, res) {
    try {
        const music = await Music.findById(req.params.id);
        if (!music) throw new Error("Music not found");

        res.status(200).json({ success: true, message: "Found music", data: music });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function createMusic(req, res) {
    try {
        const { title, composer } = req.body;
        const music = new Music({ title, composer });
        await music.save();

        res.status(200).json({ success: true, message: "Successfully created music", data: music });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function updateMusic(req, res) {
    try {
        const music = await Music.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!music) throw new Error("Music not found");

        res.status(200).json({ success: true, message: "Successfully updated music", data: music });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function deleteMusic(req, res) {
    try {
        const music = await Music.findByIdAndDelete(req.params.id);
        if (!music) throw new Error("Music not found");

        res.status(200).json({ success: true, message: "Successfully deleted music", data: music });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

module.exports = {
    getAllMusic,
    getMusicById,
    createMusic,
    updateMusic,
    deleteMusic
};
