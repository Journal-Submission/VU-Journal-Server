const multer = require('multer');
const path = require('path');

// Function to define storage for Journal files
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (['.pdf', '.docx'].includes(path.extname(file.originalname))) {
            callback(null, path.join(__dirname, '../public/journals/upload'), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        } else if (['.jpg', '.jpeg', '.png', 'gif'].includes(path.extname(file.originalname))) {
            callback(null, path.join(__dirname, '../public/profile-pictures/upload'), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
});

// Function to define storage for image files
// const imageStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, path.join(__dirname, '../public/profile-pictures/upload'), (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     },
//     filename: function (req, file, callback) {
//         callback(null, Date.now() + path.extname(file.originalname), (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }
// });

// Middleware for uploading Journal files
// const uploadJournal = multer({ storage: journalStorage });

// Middleware for uploading images
const upload = multer({ storage });

module.exports = { upload };