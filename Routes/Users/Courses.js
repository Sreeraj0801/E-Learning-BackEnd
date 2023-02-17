const express = require('express');
const router = express.Router();
const {checkUser}  = require('../../Middlewares/userAuth')
const {getAllCourses } = require('../../Controller/courseController')
//--------------get course details------
router.get('/',getAllCourses)

module.exports = router;