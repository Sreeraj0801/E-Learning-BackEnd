const mongoose = require('mongoose');
const courseSchema = require('../Models/CourseSchema')

//---------------Error Handling -------------------
const errorHandle = async (errors)=>{
    console.log(errors);
    if(errors.code === 11000) {
         errors.message ="Course already exist ";
        errors.present = "Course already exist ";
        return errors;
     }
     if(errors.name){
        errors.message = "course name is required";
     }
}

//---------------create course-------------------
exports.createCourse  = async (req,res,next) => {
    try {
   
        const {name,discription} = req.body;
        const course = await courseSchema.create({name,discription});
        res.status(201).json({course,created:true})
    } catch (error) {
        errorHandle(error)
        const {message} = error
        res.json({error,message,created: false});
    }
}

//--------------- get all  course-------------------
exports.getAllCourses = async(req ,res, next) => {
    try {
         details = await (await courseSchema.find()).reverse();
         res.json({details})
    } catch (error) {
        console.log(error);
    }
}

//--------------- Get A  course-------------------
exports.getCourse = async(req,res,next) => {
    console.log("i am here");
    try {
         const {id} = req.params;
         let details = await courseSchema.findById({_id:id});
         res.json(details)
    } catch (error) {
        console.log(error);
        res.json('error')
    }
}

//--------------- Update course-------------------
exports.updateCourse = async (req,res,next)=>{
    try {
        const {id} = req.body;
        const body = {
                name: req.body.name,
                discription: req.body.discription}
                    const details =await courseSchema.findByIdAndUpdate(id, body);
                    res.json(details)
                
    } catch (error) {
        errorHandle(error)
        const {present} = error;
        error.status = false
        res.json(error) 
    }
}

//--------------- Delete course-------------------
exports.deleteCourse = async (req,res,next) => {
    const {id} = req.body;
    console.log(id);
    try {
        let details = await courseSchema.findByIdAndRemove(id);
        res.json(details);
    } catch (error) {
        res.json(error);
    }
}