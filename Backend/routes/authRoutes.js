const express = require("express");
const { registerUser, loginUser, resetPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/forgotpassword", resetPassword);

module.exports = router;
