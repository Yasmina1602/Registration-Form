const { User } = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Foydalanuvchi topilmadi' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Noto'g'ri parol" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.header('x-auth-token', token).json({
      message: "success", token
    })
  }
  catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ message: 'Serverda /login xatolik' });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Bu username allaqachon mavjud!" });
    }
    
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Bu email allaqachon mavjud!" });

    const hashPass = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashPass })
    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.status(201).json({
      message: "success", token
    })

  }
  catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ message: 'Serverda /register xatolik' });
  }
})

module.exports = router;


