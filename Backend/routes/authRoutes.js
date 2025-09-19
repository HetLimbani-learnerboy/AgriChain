const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// All authentication routes will be prefixed with /api/auth
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
