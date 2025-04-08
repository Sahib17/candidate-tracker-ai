import express from 'express';
import fs from 'fs';
import path from 'path';
import { upload } from "../utils/upload.js";
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const jobRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🧹 Clear folder helper
function clearFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const filePath = path.join(folderPath, file);
            if (fs.lstatSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        });
    }
}

jobRouter.post('/upload', async (req, res, next) => {
    const uploadsPath = path.join(__dirname, '..', 'uploads');
    const tempPath = path.join(__dirname, '..', 'temp');

    // ✅ Clear folders BEFORE uploading
    clearFolder(tempPath);
    clearFolder(uploadsPath);

    // Proceed to multer upload
    upload.array('resumes', 10)(req, res, function (err) {
        if (err) {
            console.error("❌ Multer error:", err.message);
            return res.status(400).send("Error uploading files.");
        }

        try {
            // ✅ Save job description
            const jobDescription = req.body.jobDescription;
            const jdPath = path.join(tempPath, `jd-${Date.now()}.txt`);
            fs.writeFileSync(jdPath, jobDescription, 'utf-8');

            if (!req.files || req.files.length === 0) {
                return res.status(400).send("No resumes uploaded.");
            }

            // ✅ Call Python script
            const command = `"C:\\Python313\\python.exe" ./python/main.py "${jdPath}" "${uploadsPath}"`;

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error("❌ Python error:", error.message);
                    return res.status(500).send("Python script execution failed.");
                }

                try {
                    const result = JSON.parse(stdout);
                    res.render('results', { results: result });
                } catch (parseError) {
                    console.error("❌ JSON parse error:", parseError.message);
                    console.log("Raw Python output:", stdout);
                    return res.status(500).send("Failed to parse Python output.");
                }
            });

        } catch (err) {
            console.error("❌ Server error:", err.message);
            res.status(500).send("Internal Server Error");
        }
    });
});

export default jobRouter;
