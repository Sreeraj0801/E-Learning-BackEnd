const mongoose = require('mongoose');
const classSchema = require('../Models/ClassSchema');
const ClassSchema = require('../Models/ClassSchema');

//--------------- Parsing Date  -----------------
function parseDate(date){
const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear();
return (`${day}/${month}/${year}`)
}


//---------------Error Handling -----------------
const errorHandle = async (errors)=>{
    if(errors.code === 11000) {
         errors.message ="Class already exist ";
        errors.present = "Class already exist ";
        return errors;
     }
     if(errors.name){
        errors.message = "Class name is required";
     }
}



//----------- Create class ---------------
exports.createClass = async(req,res)=>{
    try {
        const {date ,courseName, chapterName,seats} = req.body; 
        let formatDate = parseDate(new Date(date));
        const details = await classSchema.create({date ,courseName, chapterName , formatDate,seats});
        res.status(201).json({details,created:true})
    } catch (error) {
        errorHandle(error)
        const {message} = error
        console.log(error);
        res.status(409).json({error,message,created: false});
    }
}

//--------------- get all  classed-------------------
exports.getAllClass = async(req ,res, next) => {
    try {
         details = await ( classSchema.find());
         res.json({details})
    } catch (error) {
        console.log(error);
    }
}

//--------------- Get A  class-------------------
exports.getClass = async(req,res,next) => {
    try {
         const {id} = req.params;
         let details = await classSchema.findById({_id:id});
         res.json(details)
    } catch (error) {
        console.log(error);
        res.json('error')
    }
}

//--------------- Update class-------------------
exports.updateClass = async (req,res,next)=>{
    try {
        const {id} = req.body;
        let formatDate = parseDate(new Date(req.body.date));
        const body = {
                className: req.body.className,
                discription: req.body.discription,
                date:req.body.date,
                formatDate,
                courseName:req.body.courseName,
                seats:req.body.seats
            }
                    const details = await classSchema.findByIdAndUpdate(id,body);
                    res.json(details)
                
    } catch (error) {
        console.log(error,"dd");
        errorHandle(error)
        error.status = false
        res.json(error) 
    }
}

//--------------- Delete class-------------------
exports.deleteClass = async (req,res,next) => {
    const {id} = req.body;
    try {
        let details = await classSchema.findByIdAndRemove(id);
        res.json({details,message:"deleted Succesfully"});
    } catch (error) {
        res.json(error);
    }
}
//--------------- get user class-------------------
exports.getUserClasses = async (req,res) => {
    try {
    const {courseName,date} = req.body;
    let formatDate = await parseDate(new Date(date));
    const details = await classSchema.find({formatDate: formatDate,courseName:courseName,});
    console.log(details);
    res.json(details)
    } catch (error) {
      console.log(error);
        res.status(404).json(error) 
    }
  }
  

  //----------------  book classes -----------------
  exports.bookClass = async (req,res) => {
    try {
        const {classId,sId} = req.body;
        const data = {
            sId,
            message:"Requested",
            status:false
        }
        const details = await ClassSchema.updateOne({ _id: classId }, { $push: {students: data } });
        const  user= await ClassSchema.find({ _id: classId });
        let message = user[0].students[0].message
        res.json({details,user,message})
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
  }