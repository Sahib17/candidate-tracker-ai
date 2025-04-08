    import express from "express";
    import isLoggedIn from "../utils/isLoggedIn.js";
    import redirectLoggedIn from "../utils/redirectifLoggedIn.js";
    const Pagerouter = express.Router();

    Pagerouter.get("/", redirectLoggedIn, (req, res) => {
        res.render("home");
    });


    Pagerouter.get('/login',redirectLoggedIn,(req, res) => {
        res.render('login');
    })

    Pagerouter.get('/signup',redirectLoggedIn,(req, res) => {
        res.render('signup');
    })

    Pagerouter.get('/main', isLoggedIn,(req, res) => {
        res.render('main', {user: req.user});
    })

    export default Pagerouter;