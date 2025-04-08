import express from 'express';
import pageRouter from "./Routes/pageRouter.js";
import ConnectDb from "./db/ConnectDb.js";
import userRouter from "./Routes/userRouter.js";
import env from "dotenv";
import cookieParser from "cookie-parser";
import jobRouter from "./Routes/jobRouter.js";

env.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', pageRouter);
app.use("/auth",userRouter);
app.use("/ats",jobRouter);


ConnectDb().then(() => {
    app.listen(8080, '0.0.0.0', () => {
        console.log('Server running on port 8080');
    });

}).catch((err) => {
    console.error(err);
})

