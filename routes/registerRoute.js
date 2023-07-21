const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    if (!name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ error: 'Provide all the required fields.' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User's Email or Mobile already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (error) {
    console.error('Error during Register: ' + error.message);
    return res
      .status(500)
      .json({ error: 'Something went wrong, please try again later.' });
  }
});

module.exports = router;
