const express = require("express");
const musicRepo = require("../repositories/music.repository");
const router = express.Router();

router.get("/", musicRepo.getAllMusic);
router.get("/:id", musicRepo.getMusicById);
router.post("/", musicRepo.createMusic);
router.put("/:id", musicRepo.updateMusic);
router.delete("/:id", musicRepo.deleteMusic);

module.exports = router;
