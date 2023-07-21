const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address',
    },
  },

  mobile: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        const mobileRegex = /^\d{10}$/;
        return mobileRegex.test(value);
      },
    },
  },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
