const express = require('express');
const router = express.Router();
const {checkAdmin}  = require('../../Middlewares/adminAuth')
const {userStatus,userRequest ,userApproved}  = require('../../Controller/userManger')

//------------ User Management ---------
router.put('/approve', checkAdmin, userStatus);

//------------ User Management ---------
router.get('/request',checkAdmin,userRequest)

router.get('/approved',checkAdmin,userApproved)



module.exports = router;