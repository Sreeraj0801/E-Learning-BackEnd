require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const UserSchema = require("../Models/UserSchema");


const key = process.env.JWT_SECRET_KEY ; 
const maxAge = 3 * 24 * 60 * 60 ;




//-------------admin LoginPge-------------------
exports.adminLogin = async (req,res,next) => {
    const {username} = req.body;
    try {
        const token = jwt.sign({username}, key, { expiresIn: 10000 });
        res.cookie("adminToken", token, {
            withCrdentials:true,
            httpOnly : false,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({admin:"admin" , created : true});
    } catch (error) {
        console.log(error);
    res.status(404).json({error,error:true})
    }

}

