// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only JPG, PNG, and PDF files are allowed!"), false);
//     }
// };

// const upload = multer({ storage, fileFilter });

// export default upload;

import multer from "multer";
import path from "path";

// Temporary storage before sending to Cloudinary
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG, and PDF files are allowed!"), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
