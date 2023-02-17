const express = require('express');
const router = express.Router();
const {createCourse,updateCourse,getAllCourses,getCourse,deleteCourse} = require('../../Controller/courseController');
const {checkAdmin}  = require('../../Middlewares/adminAuth');

//------------------ Create Courses ----------
router.post('/create',checkAdmin,createCourse);

//----------------- Get all Courses ----------
router.get('/',checkAdmin,getAllCourses)

//------------- Get Courses to edit ----------
router.get('/edit/:id',checkAdmin,getCourse)

//------------------ Update Courses ----------
router.patch('/edit',checkAdmin,updateCourse)

//------------------ Delete Courses ----------
router.delete('/delete',deleteCourse)


module.exports = router;