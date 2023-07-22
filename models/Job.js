const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  logoUrl: {
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
  jobPosition: { type: String, required: true },
  monthlySalary: { type: Number, required: true },
  jobType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time'],
  },
  remoteOrOffice: {
    type: String,
    required: true,
    enum: ['Remote', 'In-Office'],
  },
  location: { type: String, required: true },
  aboutCompany: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  information: { type: String, required: true },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
