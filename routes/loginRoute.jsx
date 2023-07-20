const mongoose = require('mongoose');
const express = require('express');
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
      res
        .status(401)
        .json(
          'Invalid credentials ! Kindly recheck email or password entered .'
        );
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    console.error('Error during Login : ' + error.message);
    res.status(500).json('Something went wrong . Please try again later .');
  }
});

module.exports = router;
