const UserSchema = require("../Models/UserSchema");
const jwt = require('jsonwebtoken')
require('dotenv')
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge,
    })
};
const handleErrors = (err) => {
    let errors = { email: "", password: "" };

    if (err.message === "Incorrect Email") errors.email = "That email is not registerd";
    if (err.message === "Incorrect Password") errors.password = "Incorrect Password";

    if (err.code === 11000) {
        errors.email = "Email  already registered";
        return errors;
    }

    if (err.message.includes('Users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            console.log(errors);
        })
    }
    return errors;
};
//---------------Error Handling -----------------
const errorHandle = async (errors) => {
    if (errors.code === 11000) {
        errors.message = "User already exist ";
        errors.present = "User already exist ";
        return errors;
    }
    if (errors.name) {
        errors.message = "All fields are required";
    }
    if (errors.errors) {
        errors.message = "Invalid details";
    }
}


//---------------User Registration  -----------------
exports.userRegister = async (req, res) => {
    try {
        const { uname, email, mobile, course, pword } = req.body;
        let status = false;
        const details = await UserSchema.create({ uname, email, mobile, course, pword, status });
        res.status(201).json({ details, created: true })
    } catch (error) {
        errorHandle(error)
        const { message } = error
        res.json({ error, message, created: false });
    }
}
//------------------ To login user ---------------------
exports.userLogin = async (req, res) => {
    try {
        const { email, pword } = req.body;
        const user = await UserSchema.login(email, pword);
        console.log(user);
        if (!user.status) {
            res.json({message:"Need Approval"})
        } else {
            const token = createToken(user._id);
            res.cookie('userToken', token, {
                withCrdentials: true,
                httpOnly: false,
                maxAge: maxAge * 1000,
            })

            res.status(200).json({ user: user._id, created: true });
            console.log(user._id);
        }
    } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        res.json({ errors, created: false });
    }
}
//--------------- To get user details -----------------
exports.getDetails = async  (req,res) => {
    const {email} = req.body;
    const details = await UserSchema.findOne({email})
    console.log(details);
    res.json("hai")
}