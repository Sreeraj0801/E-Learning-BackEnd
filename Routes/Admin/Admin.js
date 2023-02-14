const express = require('express');
const router = express.Router();
const {adminLogin} = require('../../Controller/adminController');
const {isAdmin,checkAdmin}  = require('../../Middlewares/adminAuth')

//------------------Login Page----------
router.post('/',isAdmin , adminLogin);
 
module.exports = router;