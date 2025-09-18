const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Config/db");
const authRoutes = require("./routes/authRoutes");
const bcrypt=require("bcrypt");
const User =require("./models/User");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
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
          email: newUser.email
        }
    });
  }catch(err){
    res.status(500).json({ message: "Server error", err });
  }
});

app.get("/",(req,res)=>{
  console.log("root requested");
  res.send("root requested");
})
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
})