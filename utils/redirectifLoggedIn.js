import jwt from "jsonwebtoken";

function redirectLoggedIn(req, res, next) {

    try {
        const token = req.cookies.UserToken;

        if (token) {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data;
            return res.redirect('/main');
        }
    } catch (err) {
        console.log("Invalid token:", err.message);
    }

    next();
}

export default redirectLoggedIn;
