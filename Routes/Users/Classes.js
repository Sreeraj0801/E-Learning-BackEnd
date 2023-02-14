const express = require('express');
const router = express.Router();
const {checkUser}  = require('../../Middlewares/userAuth')
const {getDetails}  = require('../../Controller/userController')
const {getUserClasses,bookClass}  = require('../../Controller/classController')

//--------------get user details------
router.get('/details',getDetails)

//-------------Available class on that date ------
router.post('/',getUserClasses)

//-------------- Book class --------------
router.post('/book',bookClass)

module.exports = router;