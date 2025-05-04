const bcrypt = require('bcrypt');
const User = require("../models/UserModel");

async function addUser(req, res) {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            throw new Error("Fullname, email and password are required");
        }

        const user = new User({ fullname, email, password });
        await user.save();

        res.status(200).json({ 
            success: true, 
            message: "Successfully Registered User", 
            data: user 
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email: email });
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid Password");

        res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getAllUser(req, res) {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, message: "Found all users", data: users });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getUserByEmail(req, res) {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if (!user) throw new Error("User not found");

        res.status(200).json({ success: true, message: "Found user", data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function updateFullname(req, res) {
    try {
        const { fullname } = req.body;
        if (!fullname) throw new Error("Fullname is required");

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { fullname },
            { new: true }
        ).select('-password');
        
        if (!user) throw new Error("User not found");

        res.status(200).json({ success: true, message: "Successfully updated fullname", data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function updatePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) throw new Error("Old password and new password are required");

        const user = await User.findById(req.params.userId);
        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) throw new Error("Invalid old password");

        user.password = newPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Successfully updated password" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function getUserPlans(req, res) {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate('plans');
        
        if (!user) throw new Error("User not found");

        res.status(200).json({ success: true, message: "Found user plans", data: user.plans });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function addUserPlan(req, res) {
    try {
        const { planId } = req.body;
        if (!planId) throw new Error("Plan ID is required");

        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { plans: planId } },
            { new: true }
        ).select('-password')
        .populate('plans');
        
        if (!user) throw new Error("User not found");

        res.status(200).json({ success: true, message: "Successfully added plan to user", data: user });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) throw new Error("User not found");

        res.status(200).json({ success: true, message: "Successfully deleted user" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
        console.log(`Error Message: ${err.message}`);
    }
}

module.exports = {
    addUser,
    login,
    getAllUser,
    getUserByEmail,
    updateFullname,
    updatePassword,
    getUserPlans,
    addUserPlan,
    deleteUser
};