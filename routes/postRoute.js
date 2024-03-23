const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const { authenticate, verifyEditor, verifyReviewer } = require('../middleware/authentication');
const authSchema = require('../validators/authValidator');
const validate = require('../middleware/validator');
const { upload } = require('../middleware/multer');

// Routes
router.post('/journal/add-article', authenticate, upload.single('journal-attachment'), postController.addJournalArticle);
router.get('/journal/get-article', authenticate, postController.getJournalArticle);
router.post('/auth/register', validate(authSchema.register), authController.register);
router.post('/auth/login', validate(authSchema.login), authController.login);
router.post('/send-mail', postController.sendMail);
router.get('/auth/logout', authenticate, authController.logout);
router.get('/auth/user', authenticate, authController.userProfile);
router.post('/auth/verify-email', authController.verifyEmail);
router.post('/auth/reset-password', authController.resetPassword);
router.get('/journal/get-journal-list', postController.getJournalList);
router.post('/journal/add-journal', postController.addJournal);
router.post('/auth/update-profile', authenticate, upload.single('profile-picture'), authController.updateProfile);
router.post('/auth/check-user', authController.checkUser);
router.get("/journal/get-article-list/:journalId", postController.getArticleList);
router.get("/user/get-user-list", authenticate, verifyEditor, authController.userList);
router.post("/journal/update-article", authenticate, verifyEditor, postController.updateArticle);
router.post("/journal/add-reviewer", authenticate, verifyEditor, postController.addReviewer);
router.post("/journal/add-bulk-reviewer", authenticate, verifyEditor, postController.addBulkReviewer);
router.get("/journal/get-reviewer-list", authenticate, verifyEditor, postController.getReviewerList);
router.get("/journal/get-review-articles", authenticate, verifyReviewer, postController.getReviewArticles);
router.post("/journal/update-review", authenticate, verifyReviewer, postController.updateReview);
router.get("/journal/delete-reviewer/:reviewerId", authenticate, verifyEditor, postController.deleteReviewer);
router.post("/zip/create-zip", authenticate, verifyEditor, postController.createZip);

module.exports = router;