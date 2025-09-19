const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ status: "fail", message: "Please provide name, email, and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "fail", message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password from the output
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error", error: err.message });
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: "fail", message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ status: "fail", message: "Incorrect email or password" });
    }
    
    // Remove password from the output
    user.password = undefined;

    res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
            user,
        }
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Server error", error: err.message });
  }
};

// Note: Forgot/Reset password functionality requires an email service (e.g., Nodemailer, SendGrid)
// and is a more advanced topic. The stubs have been removed for clarity in this core correction.

