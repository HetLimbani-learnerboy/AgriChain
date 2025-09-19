const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String,
    required: true 
  },
  isverifyed:{
    type: Boolean,
    default:false
  },
  otp:{
    type:Number
  },
  otpExpiry: {
    type:Date
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);