const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        error:
          'Invalid credentials ! Kindly recheck email or password entered .',
      });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    return res.json({ token, recruiterName: user.name });
  } catch (error) {
    console.error('Error during Login : ' + error.message);
    return res
      .status(500)
      .json({ error: 'Something went wrong . Please try again later .' });
  }
});

module.exports = router;
