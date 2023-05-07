import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pictures',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    public_id: (req, file) => `picture_${Date.now()}`
  },
});

// Create multer middleware
const upload = multer({ storage: storage });

export default upload;
