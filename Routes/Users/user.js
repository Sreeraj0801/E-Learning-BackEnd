const express = require('express');
const router = express.Router();

const {userRegister,userLogin} = require('../../Controller/userController')

//------------ User Registration -----------------
router.post('/register',userRegister)

//------------ User Registration -----------------
router.post('/login',userLogin)



module.exports = router;