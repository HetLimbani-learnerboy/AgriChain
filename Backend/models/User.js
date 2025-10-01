const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { 
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
    required: true
  }, 
  role: { 
    type: String, 
    enum: ["farmer", "admin", "distributor", "retailer","consumer","government"], 
    default: "farmer" 
  },
  phone: { 
    type: String, 
    default: "" 
  },
  isverifyed:{
    type: Boolean,
    default:false
  },
  otp:{
    type:String
  },
  otpExpiry: {
    type:Date
  }
}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
