const multer = require('multer')
const { cloudinary } = require('../cloudinary')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });

// const upload = multer({ storage });


module.exports.uploadImageCloudTemporary = (path) => {
    const upload = multer({ storage: cloudinary.createfolder(path) })
    console.log(path)
    return upload.single('file')
}