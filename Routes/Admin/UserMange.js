const express = require('express');
const router = express.Router();
const {checkAdmin}  = require('../../Middlewares/adminAuth')
const {userStatus,userRequest}  = require('../../Controller/userManger')

//------------ User Management ---------
router.put('/approve', checkAdmin, userStatus);

//------------ User Management ---------
router.get('/request',userRequest)



module.exports = router;