const express = require('express');
const router = express.Router();
const {checkAdmin}  = require('../../Middlewares/adminAuth');
const {createClass,getAllClass,getClass,updateClass,deleteClass} = require('../../Controller/classController')

//-------------- Create Class ---------------
router.post('/create',checkAdmin,createClass)

//-------------- Get all Class --------------
router.get('/',checkAdmin,getAllClass)

//-------------- Get A Class --------------
router.get('/edit/:id',checkAdmin,getClass)

//-------------- Get A Class --------------
router.put('/edit',checkAdmin,updateClass)

//-------------- Get A Class --------------
router.delete('/delete',checkAdmin,deleteClass)

module.exports = router;