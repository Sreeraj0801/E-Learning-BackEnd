const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret =process.env.JWT_SECRET_KEY ;



module.exports = {
    //------------------------check the token-------------------------------> 
    checkUser:(req,res,next) =>{
        const token = req.cookies.userToken;
  if (!token) {
    return res.status(401).json("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json("Invalid token.");
  }
    }

}
 
