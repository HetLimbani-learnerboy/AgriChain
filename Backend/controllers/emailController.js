const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {

      // https://myaccount.google.com/apppasswords
      // goto this url and generat a app password and write at .env file PASS="google pass"
      // gmail
        user: 'harshwithpc@gmail.com',
        pass: 'cpig flhh pizq iunk'
    }
});

module.exports = transporter;
