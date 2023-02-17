const nodemailer = require('nodemailer');
const UserSchema = require("../Models/UserSchema");
const ClassSchema = require("../Models/ClassSchema");


//-------------To send Email -------------------
function sendEmail(user){
    // Define the transporter object with your email provider's SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
      user: 'demo082001@gmail.com',
      pass: 'awvibypznxewweob'
    }
  });
  
  const mailOptions = {
    from: 'demo082001@gmail.com',
    to: user.email,
    subject: 'Status Update',
    html: `    <h4>Hello,${user.uname}</h4>
    <p>Your Entry for the  ${user.course} course  have been <strong>approved</strong>.</p>
    <p>Regards,</p>
    <p>Admin</p>
    <p>E-Learning</p>
  `
  };
  // Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return(error)
    } else {
      console.log('Email sent: ' + info.response);
    }
});

}


//----------------- Update user status -------------
exports.userStatus = async (req,res,next) => {
    try {
        const {userId} = req.body;
        console.log(userId,"hai");
        const details = await UserSchema.updateOne({ _id:userId}, { $set: { status: true } });
        const user = await UserSchema.findById({_id:userId});
        await sendEmail(user)
        res.json(details)
    } catch (error) {
        res.json("error")
        
    }   
}

//---------------------- user requests to login ----------------
exports.userRequest = async (req,res) => {
    try {
        UserSchema.find({ status:false}, (error, documents) => {
            if (error) {
              console.log(error);
                res.json(error)
            } else {
                res.json(documents)
            }
          });
    } catch (error) {
     res.json("error")   
    }
}
//---------------------- user requests to login ----------------
exports.userApproved = async (req,res) => {
  try {
      UserSchema.find({ status:true}, (error, documents) => {
          if (error) {
            console.log(error);
              res.json(error)
          } else {
              res.json(documents)
          }
        });
  } catch (error) {
   res.json("error")   
  }
}

