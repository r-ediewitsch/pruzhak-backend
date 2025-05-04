const express = require("express");
const userRepo = require("../repositories/user.repository");
const router = express.Router();

// get all users
router.get("/", userRepo.getAllUser);

// login
router.post("/login", userRepo.login);

// add user
router.post("/register", userRepo.addUser);

// get user by email
router.get("/email/:email", userRepo.getUserByEmail);

// update fullname
router.put("/updateFullname/:userId", userRepo.updateFullname);

// update password
router.put("/updatePassword/:userId", userRepo.updatePassword);

// get user plans
router.get("/plans/:userId", userRepo.getUserPlans);

// add plan to user
router.post("/addPlan/:userId", userRepo.addUserPlan);

// delete user
router.delete("/:userId", userRepo.deleteUser);

module.exports = router;