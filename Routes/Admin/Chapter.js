const express = require('express');
const router = express.Router();
const {checkAdmin}  = require('../../Middlewares/adminAuth');
const {createChapter,getAllChapters} = require('../../Controller/chapterController')

//-------------- Create Chapter ---------------
router.post('/create',checkAdmin,createChapter)

//-------------- Get all Class --------------
router.get('/',checkAdmin,getAllChapters)

// //-------------- Get A Class ----------------
// router.get('/edit/:id',checkAdmin,getClass)

// //-------------- Get A Class ----------------
// router.put('/edit',checkAdmin,updateClass)

// //-------------- Get A Class ----------------
// router.delete('/delete',checkAdmin,deleteClass)

module.exports = router;