const mongoose = require('mongoose');
const chapterSchema = require('../Models/ChapterSchema')


//---------------Error Handling -----------------
const errorHandle = async (errors)=>{
    if(errors.code === 11000) {
         errors.message ="Chapter already exist ";
        errors.present = "Chapter already exist ";
        return errors;
     }
     if(errors.name){
        errors.message = "Chapter name is required";
     }
}


exports.createChapter = async (req,res,next)=>{
    try {
        const {chapterName,courseName,discription} = req.body;
        const details = await chapterSchema.create({chapterName,courseName,discription});
        res.status(201).json({details,created:true})
    } catch (error) {
        errorHandle(error);
        const {message} = error
        console.log(error);
        res.status(409).json({error,message,created: false});
    }
}

exports.getAllChapters = async (req,res) => {
    try {
        details = await ( chapterSchema.find());
        res.json({details})
   } catch (error) {
       console.log(error);
   }
}