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
      res.status(400).json('Provide with all the required fields .');
    }

    const existingUser = await User.findOne({ email, mobile });
    if (existingUser) {
      res.status(409).json("User's Email or Mobile already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      mobile,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const Token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error during Register : ' + error.message);
    res.status(500).json('Something went wrog please try again later .');
  }
});

module.exports = router;
