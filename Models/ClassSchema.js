const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className:{
        type:String,
        required:true,
        unique:true
    },
    discription:{
        type:String
    },
    date:{
        type:Date,
        require:true
    },
    formatDate: {
        type:String,
        require:true
    },
    courseName:{
        type:String,
        require:true
    },
    seats:{
        type:Number,
        require:true
    },
    students:[{
        sId:{
            type:String
        },
        message:{
            type:String
        },
        status:{
            type:Boolean
        }
    }]
})

module.exports = mongoose.model('Classes',classSchema);