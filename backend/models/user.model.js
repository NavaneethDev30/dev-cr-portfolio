import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user name is required'],
        trim:true,
        minLength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,'emial is required'],
        trim:true,
        unique:true,
        minLength:2,
        maxlength:40,
        lowerCase:true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    },
password: {
  type: String,
  required: [true, "Password is required"],
  validate: {
    validator: function (value) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);
    },
    message:
      "Password must contain uppercase, lowercase, number and special character",
  },
},
},{timestamps:true})


const User=mongoose.model('User',userSchema);

export default User;