const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true, 
    select: false 
  }, // select:false to hide by default
  role: { 
    type: String, 
    enum: ["farmer", "admin", "distributor", "retailer"], 
    default: "farmer" 
  },
  phoneNumber: { 
    type: String, 
    default: "" 
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
