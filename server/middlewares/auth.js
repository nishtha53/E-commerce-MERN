const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

//authentication for protected routes
const auth = async (req, res, next) => {
    //middleware function
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, "newuser");
        const user = await User.findOne({ _id: decoded._id });
        if(!user) {
            res.status(401).json({
                error: "Please authenticate!",
            });
        }
        //if(user.userType !== 'admin'){
            //return res.status(400).json({ message: "User Access Denied" });
        //}
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            error: "Something went wrong in auth!",
        });
        console.log(error);
    }
};
module.exports = auth;