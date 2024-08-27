import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Filename
    //Added time stamp to remove redundancy in filename
  },
});

const upload = multer({ storage: storage });

export { storage, upload };
