const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const transporter = require("../controllers/emailController");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User does not exist" });
    if (!user.isverifyed) return res.status(403).json({ message: "Email not verified" });

    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) return res.status(401).json({ message: "Invalid credentials" });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});


const sendOTPEmail = async (user) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

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

router.post("/forgotpassword/auth", async (req, res) => {
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

router.post("/forgotpassword/verify", async (req, res) => {
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

router.patch("/forgotpassword/reset", async (req, res) => {
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

module.exports = router;
