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
        console.log("⚠️ Invalid token:", err.message);
    }

    console.log("🟢 No valid token, continuing to next()");
    next();
}

export default redirectLoggedIn;
