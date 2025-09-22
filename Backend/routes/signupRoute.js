const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const transporter = require("../controllers/emailController");

const router = express.Router();

router.get("/verify/:id", async (req, res) => {
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
    from: "AgriChain",
    to: user.email,
    subject: "Verify your email",
    html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
  });
  return res.status(201).json({ message: "otp is sent", email: user.email });
});

router.post("/verify/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { otp } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isverifyed) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "OTP is wrong" });
    }

    if (!user.otpExpiry || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isverifyed = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
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

module.exports = router;
