import express from "express";
const userRouter = new express.Router();
import {login, logout, signup} from "../Controllers/userController.js";
import isLoggedIn from "../utils/isLoggedIn.js";

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", isLoggedIn,logout);


export default userRouter;