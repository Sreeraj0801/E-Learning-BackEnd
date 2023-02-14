const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    discription :{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Course',courseSchema);