const express = require('express');
const Job = require('../models/Job'); // Assuming you have a Job model defined
const jwtAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/job-post', async (req, res) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remoteOffice,
    location,
    aboutCompany,
    skillsRequired,
    information,
  } = req.body;

  try {
    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !monthlySalary ||
      !jobType ||
      !remoteOffice ||
      !location ||
      !aboutCompany ||
      !skillsRequired ||
      !information
    ) {
      return res
        .status(400)
        .json({ error: 'Provide all the required fields.' });
    }

    const newJobPost = new Job({
      'Company Name': companyName,
      'Add logo URL': logoUrl,
      'Job position': jobPosition,
      'Monthly salary': monthlySalary,
      'Job Type': jobType,
      'Remote/Office': remoteOffice,
      Location: location,
      'About Company': aboutCompany,
      'Skills Required': skillsRequired,
      Information: information,
    });

    await newJobPost.save();
    res.status(200).json({ message: 'Job created successfully !' });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: 'Something went wrong, please try again later.' });
  }
});
module.exports = router;
