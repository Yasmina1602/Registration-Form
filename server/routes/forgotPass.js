const { User } = require('../models/userModel')
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt"); 
const express = require('express');
const router = express.Router();
require("dotenv").config()

let verifyCode = null;
let currentEmail = null;

router.post('/forgotPass', async (req, res) => {
  try {
    console.log(req.body);

    const { email } = req.body
    currentEmail = email

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "user doesn't exist in the system" })

    verifyCode = Math.floor(1000 + Math.random() * 9000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL, 
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Hello from Nodemailer!",
      text: `Hello, welcome to Registration-Form, enter the following code on the web page to reset your password \n \t ${verifyCode} \n`,
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({ message: "Check your email" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error sending message!" });
  }
})

router.post('/verifyCode', async (req, res) => {
  try {
    console.log(req.body);
    const { checkCode } = req.body;

    if (parseInt(checkCode) !== verifyCode) {
      return res.status(400).json({ message: "The code is invalid, please try again!" });
    }

    verifyCode = null 
    res.json({ message: "Code confirmed :)" })
  }
  catch(error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error while verifying the code!" });
  }
})

router.post('/newPass', async (req, res) => {
  try {
    console.log(req.body);
    const { newPass, verifyNewPass } = req.body;

    if (newPass !== verifyNewPass) {
      return res.status(400).json({ message: "The password was copied incorrectly!" });
    }

    const hashPass = await bcrypt.hash(newPass, 10)
    await User.findOneAndUpdate({ email: currentEmail }, { password: hashPass });
    currentEmail = null 

    res.json({ message: "Password updated successfully :)" });
  }
  catch(error){
    console.error("Error:", error);
    res.status(500).json({ message: "Error updating password!" });
  }
})

module.exports = router;
