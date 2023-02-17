const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser =  require("body-parser");
const morgan = require('morgan');
const app = express();



//------------setting route-----------------------
// ##Admin
const adminRouter = require('./Routes/Admin/Admin');
const adminCourse = require('./Routes/Admin/Course');
const adminClass = require('./Routes/Admin/Classes');
const userManger = require('./Routes/Admin/UserMange');
const adminChapter = require('./Routes/Admin/Chapter');
// ##Users
const userRouter = require('./Routes/Users/user')
const Classes = require('./Routes/Users/Classes')
const Courses = require('./Routes/Users/Courses')

app.use(cors({origin:"http://localhost:3000", methods: ["PUT","POST","DELETE","GET","PATCH"],credentials:true}))
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json());
app.use(express.static('public'));



//----------------using routes---------------
//##admin
app.use('/admin',adminRouter);
app.use('/admin/course',adminCourse);
app.use('/admin/class',adminClass);
app.use('/admin/user',userManger);
app.use('/admin/chapter',adminChapter);
//##user
app.use('/',userRouter)
app.use('/class',Classes)
app.use('/course',Courses)



//port running on 4000
app.listen(4000,()=>{
    console.log('Server Started on port 4000');
});


//mongodb connection code
mongoose.connect('mongodb://localhost:27017/E-Learning',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB connected Succesfully");
}).catch((err)=>{
    console.log("Its showing an error ",err);
})