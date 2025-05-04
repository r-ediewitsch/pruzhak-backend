const express = require("express");
const multer = require("multer");
const concertRepo = require("../repositories/concert.repository");
const router = express.Router();

const upload = multer();

router.get("/", concertRepo.getAllConcerts);
router.get("/:id", concertRepo.getConcertById);
router.post("/", upload.single('coverImage'), concertRepo.createConcert);
router.put("/:id", concertRepo.updateConcert);
router.delete("/:id", concertRepo.deleteConcert);

module.exports = router;
