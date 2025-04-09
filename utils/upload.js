import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = './uploads';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const filePath = path.join('uploads', originalName);

        if (fs.existsSync(filePath)) {
            const name = path.parse(originalName).name;
            const ext = path.extname(originalName);
            const uniqueName = `${name}-${Date.now()}${ext}`;
            cb(null, uniqueName);
        } else {
            cb(null, originalName);
        }
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.pdf', '.doc', '.docx'].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        files: 10
    }
});
