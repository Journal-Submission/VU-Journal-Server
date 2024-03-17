const Auth = require('../models/authModel');
const bcrypt = require("bcryptjs");
const Reviewer = require('../models/reviewerModel');

const register = async (req, res) => {
    let userEmail = await Auth.findOne({ email: req.body.email });
    if (userEmail) {
        return res.status(400).json({ success: false, message: "Sorry a user with this email already exists" })
    }
    let userPhone = await Auth.findOne({ phoneNumber: req.body.phoneNumber });
    if (userPhone) {
        return res.status(400).json({ success: false, message: "Sorry a user with this phone number already exists" })
    }
    let userName = await Auth.findOne({ userName: req.body.userName });
    if (userName) {
        return res.status(400).json({ success: false, message: "Sorry a user with this username already exists" })
    }
    if (req.body.password !== req.body.confPassword) {
        return res.status(400).json({ success: false, message: "Password does not match" })
    }
    try {
        const registerUser = new Auth({
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            gender: req.body.gender
        });
        // Generate auth token
        const token = await registerUser.generateAuthToken();
        await registerUser.save();
        res.status(201).send({ success: true, message: "User registered successfully", accessToken: token })
    } catch (error) {
        res.status(404).send({ success: false, message: "User registration failed", error: error });
    }
}

const login = async (req, res) => {
    try {
        const username = req.body.userName;
        const password = req.body.password;
        let user = await Auth.findOne({ email: username });
        if (!user) {
            user = await Auth.findOne({ userName: username });
        }
        if (!user) {
            return res.status(400).send({ success: false, message: "Invalid Username" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = await user.generateAuthToken();
            const reviewer = await Reviewer.findOne({ email: user.email });
            if (reviewer) user.isReviewer = true;
            res.status(200).json({ success: true, message: "User logged in successfully", data: user, accessToken: token });
        } else {
            res.status(400).json({ success: false, message: "Invalid Password" });
        }
    }
    catch (error) {
        res.status(400).json({ success: false, message: "User login failed", error: error });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const user = await Auth.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exists" });
        }
        user.emailVerified = true;
        await user.save();
        res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Email verification failed", error: error });
    }
}

const checkUser = async (req, res) => {
    try {
        const user = await Auth.findOne({ email: req.body.email }) || await Auth.findOne({ userName: req.body.userName });
        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }
        res.status(200).json({ success: true, message: "User exists" });
    } catch (error) {
        res.status(500).json({ success: false, message: "User check failed", error: error });
    }
}

const resetPassword = async (req, res) => {
    try {
        const user = await Auth.findOne({ email: req.body.email });
        user.password = req.body.password;
        await user.save();
        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Password change failed", error: error });
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        res.clearCookie("accessToken");
        await req.user.save();
        res.status(200).send({ success: true, message: "User logged out successfully" })
    } catch (error) {
        res.status(500).send({ success: false, message: "User logout failed", error: error });
    }
}

const userProfile = async (req, res) => {
    try {
        res.status(200).send({ success: true, message: "User profile retrieved successfully", data: req.user });
    } catch (error) {
        res.status(500).send({ success: false, message: "User profile retrieval failed", error: error });
    }
}

const updateProfile = async (req, res) => {
    try {
        const user = await Auth.findOne({ _id: req.user._id });
        user.firstName = req.body.firstName;
        user.middleName = req.body.middleName;
        user.lastName = req.body.lastName;
        user.userName = req.body.userName;
        user.email = req.body.email;
        user.phoneNumber = req.body.phoneNumber;
        user.dateOfBirth = req.body.dateOfBirth;
        user.gender = req.body.gender;
        user.profilePicture = !!req.file ? req.file.filename : req.user.profilePicture;
        await user.save();
        res.status(200).send({ success: true, message: "User profile updated successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "User profile update failed", error: error });
    }
}

const userList = async (req, res) => {
    try {
        const users = await Auth.find({}, '_id firstName middleName lastName');
        res.status(200).send({ success: true, message: "User list retrieved successfully", data: users });
    } catch (error) {
        res.status(500).send({ success: false, message: "User list retrieval failed", error: error });
    }
}

module.exports = {
    register,
    login,
    logout,
    userProfile,
    verifyEmail,
    resetPassword,
    updateProfile,
    checkUser,
    userList
}