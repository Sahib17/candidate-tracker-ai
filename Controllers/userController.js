import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.render("signup", {
            toastMessage: "All fields are required",
            toastType: "error"
        });
    }

    const FoundUser = await userModel.findOne({ email });

    if (FoundUser) {
        return res.render("signup", {
            toastMessage: "User already exists",
            toastType: "error"
        });
    }

    try {
        const hash = await bcrypt.hash(password, 10);

        const CreatedUser = await userModel.create({
            firstName,
            lastName,
            email,
            password: hash
        });

        const token = jwt.sign(
            { email: CreatedUser.email, userid: CreatedUser._id },
            process.env.JWT_SECRET
        );

        res.cookie("UserToken", token);
        return res.redirect("/");
    } catch (err) {
        console.error("Signup error:", err.message);
        return res.render("signup", {
            toastMessage: "Something went wrong. Try again.",
            toastType: "error"
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('UserToken');
        return res.render("home", {
            toastMessage: "Logged out successfully!",
            toastType: "success"
        });
    } catch (err) {
        return res.render("home", {
            toastMessage: "Something went wrong. Try again.",
            toastType: "error"
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Field check
    if (!email || !password) {
        return res.render("login", {
            toastMessage: "Both fields are required",
            toastType: "error"
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.render("login", {
                toastMessage: "User not found",
                toastType: "error"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("login", {
                toastMessage: "Incorrect password",
                toastType: "error"
            });
        }

        const token = jwt.sign(
            { email: user.email, userid: user._id },
            process.env.JWT_SECRET
        );

        res.cookie("UserToken", token);
        return res.redirect("/main");
    } catch (err) {
        console.error("Login error:", err.message);
        return res.render("login", {
            toastMessage: "Something went wrong. Try again.",
            toastType: "error"
        });
    }
};