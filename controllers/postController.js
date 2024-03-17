const JournalArticle = require('../models/journalArticleModel');
const Journal = require('../models/journalModel');
const Reviewer = require('../models/reviewerModel');
const Auth = require('../models/authModel');
const nodemailer = require("nodemailer");

const addJournalArticle = async (req, res) => {
    try {
        const journalArticle = new JournalArticle({
            userId: req.body.userId,
            title: req.body.title,
            abstract: req.body.abstract,
            keywords: JSON.parse(req.body.keywords),
            file: req.file.filename,
            authors: JSON.parse(req.body.authors),
            journalId: req.body.journalId,
        });
        const responseData = await journalArticle.save();
        res.status(201).json({ success: true, message: "Journal submitted successfully", data: responseData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Journal submission failed", error: error });
    }
}

const getJournalArticle = async (req, res) => {
    try {
        const journalAData = await JournalArticle.find({ userId: req.user._id });
        const otherJournalAData = await JournalArticle.find({ 'authors.email': req.user.email });
        if (journalAData.length === 0 && otherJournalAData.length === 0) {
            return res.status(404).json({ success: false, message: "You didn't submit any journal" });
        }
        res.status(200).json({ success: true, message: "Journal Articles data retrieved successfully", data: journalAData.concat(otherJournalAData.filter(item2 => !journalAData.some(item1 => item1.id === item2.id))) });
    } catch (error) {
        res.status(404).json({ success: false, message: "Journal Articles data retrieval failed", error: error });
    }
}

const addJournal = async (req, res) => {
    try {
        const journal = new Journal({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
        });
        const responseData = await journal.save();
        res.status(201).json({ success: true, message: "Journal added successfully", data: responseData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Journal addition failed", error: error });
    }
}

const getJournalList = async (req, res) => {
    try {
        const journalData = await Journal.find();
        res.status(200).json({ success: true, message: "Journal data retrieved successfully", data: journalData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Journal data retrieval failed", error: error });
    }
}

const sendMail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_HOST,
            pass: process.env.EMAIL_HOST_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: req.body.mailFrom + " <" + process.env.EMAIL_HOST + ">",
            to: req.body.mailTo,
            subject: req.body.mailSubject,
            text: req.body.mailText,
            html: req.body.mailHtml,
        });

        if (info) {
            res.status(200).json({ success: true, message: "Mail sent successfully", data: info });
        } else {
            res.status(400).json({ success: false, message: "Mail sending failed", data: info });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: "Mail sending failed", error: error });
    }
}

const getArticleList = async (req, res) => {
    try {
        const journalAData = await JournalArticle.find({ journalId: req.params.journalId });
        if (journalAData.length === 0) {
            return res.status(404).json({ success: false, message: "No journal articles found" });
        }
        res.status(200).json({ success: true, message: "Journal Articles data retrieved successfully", data: journalAData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Journal Articles data retrieval failed", error: error });
    }
}

const updateArticle = async (req, res) => {
    console.log(req.body);
    try {
        const journalAData = await JournalArticle.findByIdAndUpdate(req.body._id, req.body, { new: true });
        if (!journalAData) {
            return res.status(404).json({ success: false, message: "Journal article not found" });
        }
        res.status(200).json({ success: true, message: "Journal article updated successfully", data: journalAData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Journal article update failed", error: error });
    }
}

const addReviewer = async (req, res) => {
    const reviewerData = await Reviewer.findOne({ email: req.body.email });
    if (reviewerData) {
        return res.status(400).json({ success: false, message: "Reviewer already exists" });
    };
    try {
        const reviewer = new Reviewer({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            affiliation: req.body.affiliation,
        })
        const responseData = await reviewer.save();
        res.status(201).json({ success: true, message: "Reviewer added successfully", data: responseData });
        await Auth.findOneAndUpdate({ email: req.body.email }, { $set: { isReviewer: true } }, { new: true });
    } catch (error) {
        res.status(404).json({ success: false, message: "Reviewer addition failed", error: error });
    }
}

const addBulkReviewer = async (req, res) => {
    try {
        const responseData = await Reviewer.insertMany(req.body);
        res.status(201).json({ success: true, message: "Reviewers added successfully", data: responseData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Reviewers addition failed", error: error });
    }
}

const getReviewerList = async (req, res) => {
    try {
        const reviewerData = await Reviewer.find();
        res.status(200).json({ success: true, message: "Reviewer data retrieved successfully", data: reviewerData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Reviewer data retrieval failed", error: error });
    }
}

const getReviewArticles = async (req, res) => {
    try {
        const journalAData = await JournalArticle.find({ 'reviewers.email': req.user.email });
        if (journalAData.length === 0) {
            return res.status(404).json({ success: false, message: "No review articles found" });
        }
        res.status(200).json({ success: true, message: "Journal Articles data retrieved successfully", data: journalAData });
    } catch (error) {
        res.status(404).json({ success: false, message: "Journal Articles data retrieval failed", error: error });
    }
}

module.exports = {
    addJournalArticle,
    getJournalArticle,
    sendMail,
    getJournalList,
    addJournal,
    getArticleList,
    updateArticle,
    addReviewer,
    addBulkReviewer,
    getReviewerList,
    getReviewArticles
}