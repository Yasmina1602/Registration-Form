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
    if (!user) return res.status(400).json({ message: "bunday foydalanuvchi tizimda mavjud emas" })

    verifyCode = Math.floor(1000 + Math.random() * 9000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL, // O‘z emailingizni yozing
        pass: process.env.APP_PASSWORD, // App Password kiritiladi
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Hello from Nodemailer!",
      text: `Autentifikatsiyaga xush kelibsiz, quyidagi kodni web-sahifaga kiriting \n \t ${verifyCode} \n`,
    };

    const info = await transporter.sendMail(mailOptions);
    res.json({ message: "Email yuborildi: " + info.response });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Xat yuborishda xatolik!" });
  }
})

router.post('/verifyCode', async (req, res) => {
  try {
    console.log(req.body);
    const { checkCode } = req.body;

    if (parseInt(checkCode) !== verifyCode) {
      return res.status(400).json({ message: "Kod xato, qayta urinib ko'ring" });
    }

    verifyCode = null // Kod tasdiqlangach, uni o‘chirib tashlaymiz
    res.json({ message: "Kod tasdiqlandi" })
  }
  catch(error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Kodni tasdiqlashda xatolik!" });
  }
})

router.post('/newPass', async (req, res) => {
  try {
    console.log(req.body);
    const { newPass, verifyNewPass } = req.body;

    if (newPass !== verifyNewPass) {
      return res.status(400).json({ message: "Parol noto'g'ri ko'chirildi!" });
    }

    const hashPass = await bcrypt.hash(newPass, 10)
    await User.findOneAndUpdate({ email: currentEmail }, { password: hashPass });
    currentEmail = null // Email tasdiqlangach, uni o‘chirib tashlaymiz

    res.json({ message: "Parol muvaffaqiyatli yangilandi" });
  }
  catch(error){
    console.error("Error:", error);
    res.status(500).json({ message: "Parolni yangilashda xatolik!" });
  }
})

module.exports = router;
