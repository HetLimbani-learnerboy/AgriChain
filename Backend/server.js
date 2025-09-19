const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bcrypt=require("bcrypt");
const User =require("./models/User");
const transporter = require("./controllers/emailController");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});



app.get("/signup/verify/:id",async (req,res)=>{
    const {id}=req.params;
    const user = await User.findById(id);
    if(user.isverifyed){
      return res.status(400).json({ message: "Email already verifyed" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); 
    await User.updateOne(
      { _id: id },
      { $set: { otp: otp, otpExpiry:expiry} }
    );


    await transporter.sendMail({
        from: '"My App" <harshwithpc@gmail.com>',
        to: user.email,
        subject: "Password Reset",
        html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
      });
    return res.status(200).json({ message: "otp is sent",email:user.email });


});

app.post("/signup/verify/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isverifyed) {
      return res.status(400).json({ message: "Email already verified" });
    }

    // Check OTP match
    if (user.otp !== otp) {
      return res.status(400).json({ message: "OTP is wrong" });
    }

    // Check OTP expiry
    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // OTP is correct and not expired → mark verified
    user.isverifyed = true;
    user.otp = undefined;        // clear OTP
    user.otpExpiry = undefined;  // clear expiry
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});


app.post("/signup",async (req,res)=>{

  try{
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashpass=bcrypt.hashSync(password,10);
    const newUser = new User({ name, email, password:hashpass });
    await newUser.save();
    res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isverifyed:false
        }
    });

    // res.redirect(`/signup/verify/:${newUser._id}`);
  }catch(err){
    res.status(500).json({ message: "Server error", err });
  }
});

app.get("/signin",async (req,res)=>{
  try{
      const {email,password}=req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: "user not exist" });
      }

      const user= await User.findOne({email});
      const passcheck=await bcrypt.compare(password,user.password);


      if(passcheck){
        console.log("lognin successful ");
        res.send("lognin successful");
      }else{
        console.log("lognin unsuccessful");
        res.send("lognin unsuccessful");
      }
  }catch(err){
      res.status(400).send("err is catched",err);
  }
});


// app.get("/signin/forgotpassword",(req,res)=>{
//   // render a form where user write a email
//   // after click on the btn then re directed to /signin/forgotpassword/auth
// });

app.post("/signin/forgotpassword/auth", async (req, res) => {
    try {

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      // const user = await User.findOne({ email });
      // if (!user) return res.status(404).json({ message: "User not found" });


      await transporter.sendMail({
        from: '"My App" <harshwithpc@gmail.com>',
        to: req.body.email,
        subject: "Password Reset",
        html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
      });

      res.json({ message: "Email sent" });
    } catch (err) {
      console.error("Mailer error:", err);
      res.status(500).json({ error: err.message });
    }
});



app.patch("/signin/forgotpassword",async(req,res)=>{
    try{
        const {email,otp,password}=req.body;

        // first verify the otp and after that continew


        const hashPass = bcrypt.hashSync(password, 10);
        const updatedUser = await User.findOneAndUpdate(
          { email: email },            // filter condition
          { password: hashPass },      // update object
          { new: true }                // return updated user
        );

        res.json({
          message: "User updated successfully",
          user: updatedUser
        });

    }catch(err){
      res.status(500).send("err is catched",err);
    }
});

app.get("/",(req,res)=>{
  console.log("root requested");
  res.send("root requested");
});