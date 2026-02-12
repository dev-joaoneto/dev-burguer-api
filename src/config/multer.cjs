const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (_req, file) => {
      const fileName = file.originalname
        .split('.')[0]
        .replace(/\s+/g, '-')
        .toLowerCase();

      return `${Date.now()}-${fileName}`;
    },
  },
});

module.exports = multer({ storage });
