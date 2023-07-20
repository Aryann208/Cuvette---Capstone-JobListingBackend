const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
    },
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(mobileNumber);
      },
    },
  },
  password: { type: String, required: true },
});

const User = mongoose.Model('User', userSchema);

module.exports = User;
