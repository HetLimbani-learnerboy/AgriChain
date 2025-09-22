const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const transporter = require("./controllers/emailController");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT || 3021, () =>
    console.log(`✅ Server running on port ${process.env.PORT || 3021}`)
  );
});

app.get("/signup/verify/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user.isverifyed) {
    return res.status(400).json({ message: "Email already verifyed" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);
  await User.updateOne(
    { _id: id },
    { $set: { otp: otp, otpExpiry: expiry } }
  );


  await transporter.sendMail({
    // from: `"Agri Chain" <${process.env.EMAIL}>`
    from: "AgriChain",
    to: user.email,
    subject: "Verify your email",
    html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
  });
  return res.status(201).json({ message: "otp is sent", email: user.email });
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


app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await User.findOne({ email });

    const hashedPassword = bcrypt.hashSync(password, 10);

    if (user) {
      if (user.isverifyed) {
        return res.status(400).json({ message: "Email already registered" });
      } else {
        // Update unverified user
        user.name = name;
        user.password = hashedPassword;
        user.role = role;
        user.phone = phone;
        user.isverifyed = false;

        const updatedUser = await user.save();

        return res.status(201).json({
          message: "Unverified user updated successfully",
          user: {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isverifyed: updatedUser.isverifyed
          }
        });
      }
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      isverifyed: false
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isverifyed: newUser.isverifyed
      }
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error", err: err.message });
  }
});


app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    if (!user.isverifyed) {
      return res.status(404).json({ message: "User does not verifyed" });
    }
    if (!password || !user.password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
      console.log("Login unsuccessful");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Login successful");
    return res.status(200).json({ message: "Login successful" });

  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});




// app.get("/signin/forgotpassword",(req,res)=>{
//   // render a form where user write a email
//   // after click on the btn then re directed to /signin/forgotpassword/auth
// });

// FORGOT PASSWORD: Send OTP
const sendOTPEmail = async (user) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();

  await transporter.sendMail({
    from: `"AgriChain" <${process.env.EMAIL}>`,
    to: user.email,
    subject: "Password Reset OTP",
    html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
  });
  return otp;
};

app.post("/signin/forgotpassword/auth", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = await sendOTPEmail(user);
    res.status(201).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
});



// FORGOT PASSWORD: Verify OTP
app.post("/signin/forgotpassword/verify", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (!user.otpExpiry || user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

    res.status(200).json({ message: "OTP verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
});

// FORGOT PASSWORD: Reset Password
app.patch("/signin/forgotpassword/reset", async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (!user.otpExpiry || user.otpExpiry < new Date()) return res.status(400).json({ message: "OTP expired" });

    user.password = bcrypt.hashSync(password, 10);
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
});


app.get("/", (req, res) => {
  res.send("AgriChain API Root");
});

