const express = require("express");
const artistRepo = require("../repositories/artist.repository");
const router = express.Router();

router.get("/", artistRepo.getAllArtists);
router.get("/:id", artistRepo.getArtistById);
router.post("/", artistRepo.createArtist);
router.put("/:id", artistRepo.updateArtist);
router.delete("/:id", artistRepo.deleteArtist);

module.exports = router;
