const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    chapterName:{
        type:String,
        required:true,
        unique:true
    },
    courseName:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Chapter',chapterSchema);