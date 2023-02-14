const express = require('express');
const router = express.Router();
const {createCourse,updateCourse,getAllCourses,getCourse,deleteCourse} = require('../../Controller/courseController');
const {checkAdmin}  = require('../../Middlewares/adminAuth');

//------------------ Create Courses ----------
router.post('/create',createCourse);

//----------------- Get all Courses ----------
router.get('/',getAllCourses)

//------------- Get Courses to edit ----------
router.get('/edit/:id',getCourse)

//------------------ Update Courses ----------
router.put('/edit',updateCourse)

//------------------ Delete Courses ----------
router.delete('/delete',deleteCourse)


module.exports = router;