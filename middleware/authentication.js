const jwt = require('jsonwebtoken');
const Auth = require('../models/authModel');

const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer', '').trim();
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await Auth.findOne({ _id: verifyUser._id }).select({ password: 0, tokens: 0 });
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized: Invalid token", error: error });
    }
}

const verifyEditor = (req, res, next) => {
    if (req.user.isEditor) {
        next();
    } else {
        res.status(403).json({ success: false, message: "Forbidden: Access denied" });
    }
}

const verifyReviewer = (req, res, next) => {
    if (req.user.isReviewer) {
        next();
    } else {
        res.status(403).json({ success: false, message: "Forbidden: Access denied" });
    }
}

const verifySuperAdmin = (req, res, next) => {
    if (req.user.isSuperAdmin) {
        next();
    } else {
        res.status(403).json({ success: false, message: "Forbidden: Access denied" });
    }
}

module.exports = { authenticate, verifyEditor, verifyReviewer, verifySuperAdmin };