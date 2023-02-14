const jwt = require("jsonwebtoken");
require('dotenv').config();
const secret =process.env.JWT_SECRET_KEY ;
const Uname = process.env.ADMIN_USERNAME;
const Pword = process.env.ADMIN_PASSWORD;



module.exports = {
    //------------------check the userName and password--------------------->
    isAdmin : (req,res,next) => {
        const {username,password} = req.body;
       try {
         if(username === Uname && password === Pword){
            next()
        }else{
            res.json("Invalid credentials")
        }
       } catch (error) {
        res.json({error,err:true})
       }
    },


    //------------------------check the token-------------------------------> 
    checkAdmin:(req,res,next) =>{
    const token = req.cookies.adminToken;
    console.log(token);
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
 
