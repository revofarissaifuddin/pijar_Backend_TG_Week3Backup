const multer = require("multer");
const path = require("path");// eslint-disable-line no-unused-vars


// validate uploaded files
/* const FILE_TYPE_MAP = {
    // mime type
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
}; */
const storage = multer.diskStorage({
    /* destination: function (req, res, cb) {
        cb(null,"./tmp");
    }, */
    filename: function (req, res, cb) {
        // const extension = FILE_TYPE_MAP;
        const uniq = Date.now() + Math.round(Math.random() * 1E9);
        cb(null, uniq + ".png");
    }
});
const fileFilter = (req, file, cb) => {
    // Reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        req.fileValidationError = "File type not supported";
        cb(null, false);
    }
};
const upload = multer({
    storage,
    limits: { fileSize: 10 * Math.pow(1024, 4) },
    fileFilter: fileFilter
});

module.exports = upload;
