const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null,'./tmp')
    },
    filename: function (req, res, cb) {
        const uniq = Date.now() + Math.round(Math.random() * 1E9)
        cb(null, uniq + ".png");
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 10 * Math.pow(1024, 4) },
});

module.exports = upload;