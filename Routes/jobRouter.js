import express from 'express';
const jobRouter = express.Router();
import { upload } from "../utils/upload.js";
import fs from "fs";

jobRouter.post('/upload', upload.array('resumes', 10), async (req, res) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log(req.files);
    console.log(req.body.jobDescription);

    res.send("Files uploaded successfully!");
});

export default jobRouter;
