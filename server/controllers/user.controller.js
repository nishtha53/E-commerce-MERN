const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { response } = require('express');

//hashing password
const hashPassword = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    return hashPassword;
};

//gen token
const generateAuthToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString()}, "newuser");  //jwt.verify method is
    return token;
};

//finding user
const findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(404).json({ error: "Invalid user!"});
    }
    const isMatch = await bcrypt.compare(password, user.password); //comparing the password with the hashPassword
    if(!isMatch) {
        return res.status(404).json({ error: "Invalid user!" });
    }
    return user;
};

//signup
exports.signup = async (req,res) => {
    //return res.status(201).json({message:"hello"});
    const { firstName, lastName, email, password } = req.body;
    console.log("body: ", req.body);
    try {
        const isUser = await User.findOne({ email });
        if(isUser) {
            return res.status(400).json({ error: "User already exists"});
        }
        const user = new User(req.body);
        console.log("user",user)
        const hashedPassword = await bcrypt.hash(user.password, 8);
        console.log("hashedPassword",hashedPassword)
        user.password = hashedPassword;
        await user.save();
        const token = await generateAuthToken(user);
        user.password = undefined;
        res.status(201).json({ user, token });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
        console.log(error);
    }
};
//signin
exports.signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        const user = await findByCredentials(email, password,res);
        console.log(user);
        const token = await generateAuthToken(user);
        user.password = undefined;
        res.status(200).json({ user, token });
    } catch (error) {
        //res.status(500).json({ error: "Something went wrong" });
        console.log(error);
    }
};

//export
//module.exports = {
//    signin,
//    signup,
//}