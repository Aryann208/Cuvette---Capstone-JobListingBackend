const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  'Company Name': { type: String, required: true },
  'Add logo URL': {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
          value
        );
      },
      message: 'Invalid URL',
    },
  },
  'Job position': { type: String, required: true },
  'Monthly salary': { type: Number, required: true },
  'Job Type': { type: String, required: true },
  'Remote/Office': {
    type: String,
    required: true,
    enum: ['Remote', 'In-Office'],
  },
  Location: { type: String, required: true },
  'Job Type': {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time'],
  },
  'About Company': { type: String, required: true },
  'Skills Required': { type: [String], required: true },
  Information: { type: String, required: true },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
