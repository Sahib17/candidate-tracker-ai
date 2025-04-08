import jwt from "jsonwebtoken";

const isLoggedIn = (req,res,next)=>{
    if (req.cookies.UserToken === "" || Object.keys(req.cookies).length === 0) res.redirect('/');
    else {
        let data = jwt.verify(req.cookies.UserToken,process.env.JWT_SECRET);
        req.user = data;
        next();
    }
}

export default isLoggedIn;