const Concert = require('../models/ConcertModel');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer();

async function getAllConcerts(req, res) {
    try {
        const concerts = await Concert.find()
            .populate('programme')
            .populate('artists')
            .sort({ date: 1 });
        res.status(200).json({ success: true, message: "Found all concerts", data: concerts });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getConcertById(req, res) {
    try {
        const concert = await Concert.findById(req.params.id)
            .populate('programme')
            .populate('artists');
        if (!concert) throw new Error("Concert not found");

        res.status(200).json({ success: true, message: "Found concert", data: concert });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function createConcert(req, res) {
    try {
        const { title, programme, artists, date, description } = req.body;
        const file = req.file;
        if (!file) throw new Error("Cover image is required");

        // Convert arrays from strings to JSON if needed
        const programmeArray = typeof programme === 'string' ? JSON.parse(programme) : programme;
        const artistsArray = typeof artists === 'string' ? JSON.parse(artists) : artists;

        // Upload image to Cloudinary using a Promise
        const imageUpload = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: "image", folder: "concert-covers" },
                (error, uploadResult) => {
                    if (error) return reject(error);
                    resolve(uploadResult.secure_url);
                }
            ).end(file.buffer);
        });

        const concert = new Concert({
            title,
            programme: programmeArray,
            artists: artistsArray,
            date,
            description,
            coverImage: imageUpload
        });

        await concert.save();

        const populatedConcert = await Concert.findById(concert._id)
            .populate('programme')
            .populate('artists');

        res.status(200).json({
            success: true,
            message: "Successfully created concert",
            data: populatedConcert
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function updateConcert(req, res) {
    try {
        const concert = await Concert.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('programme')
            .populate('artists');
        if (!concert) throw new Error("Concert not found");

        res.status(200).json({ 
            success: true, 
            message: "Successfully updated concert", 
            data: concert,
            note: "Provide programme and artists as arrays of _id values" 
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function deleteConcert(req, res) {
    try {
        const concert = await Concert.findByIdAndDelete(req.params.id);
        if (!concert) throw new Error("Concert not found");

        res.status(200).json({ success: true, message: "Successfully deleted concert", data: concert });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

module.exports = {
    getAllConcerts,
    getConcertById,
    createConcert,
    updateConcert,
    deleteConcert
};
