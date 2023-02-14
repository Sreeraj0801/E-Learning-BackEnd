const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    uname:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [
          {
            validator: function (value) {
              return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
            },
            message: 'Invalid email address'
          }
        ]
      },
      mobile: {
        type: String,
        required: true,
        unique: true,
        validate: [
          {
            validator: function (value) {
              return /^\d{10}$/.test(value);
            },
            message: 'Invalid mobile number'
          }
        ]
      },
    course :{
        type:String,
        required:true,
    },
    pword :{
        type:String,
        required:true,
    },
    status :{
        type:Boolean,
        required:true,
    }
})
userSchema.statics.login = async function(email,pword) {
  const user = await this.findOne({email});
  if(user) {
      const auth = await bcrypt.compare(pword,user.pword);
      if(auth) {
          return user;
      }
      throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
}

userSchema.pre('save',async function (next) {
  const salt = await bcrypt.genSalt();
  this.pword = await bcrypt.hash(this.pword,salt);
  next();
})

module.exports = mongoose.model('Users',userSchema);