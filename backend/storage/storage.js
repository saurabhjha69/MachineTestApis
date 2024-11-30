import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads/")
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() + "-" + file.originalname)
    }
})

export const upload = multer({storage
    ,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error("Only JPEG and PNG files are allowed"));
        } else {
            cb(null, true);
        }
    }
})
