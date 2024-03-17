const mongoose = require('mongoose');

const journalArticleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true
    },
    journalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    keywords: [
        {
            type: String,
            required: true
        }
    ],
    file: {
        type: String,
        required: true
    },
    authors: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        affiliation: {
            type: String,
            required: true
        },
        firstAuthor: {
            type: Boolean,
            required: true
        },
        secondAuthor: {
            type: Boolean,
            required: true
        },
        correspondingAuthor: {
            type: Boolean,
            required: true
        }
    }],
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    reviewers: [{
        email: {
            type: String,
            required: true,
            default: "No reviewers yet"
        },
        status: {
            type: String,
            required: true,
            default: 'under review'
        },
        comment: {
            type: String,
            required: true,
            default: "No comments yet"
        },
        reviewDate: {
            type: Date,
            default: Date.now
        },
        reviewed: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const JournalArticle = mongoose.model('JournalArticle', journalArticleSchema);
module.exports = JournalArticle;