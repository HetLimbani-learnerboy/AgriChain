const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
// transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail", // tells Nodemailer to use Gmail SMTP
    auth: {
        user: process.env.EMAIL, // your Gmail ID (from .env)
        // got this pass from https://myaccount.google.com/apppasswords
        pass: process.env.PASS   // your Gmail App Password (from .env)
    }
});

module.exports = transporter;
