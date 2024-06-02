const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/'); // specify the upload directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // unique file names
    },
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload