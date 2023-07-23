const express = require('express');
const Job = require('../models/Job');
const jwtAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/job-post', async (req, res) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remoteOrOffice,
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
      !remoteOrOffice ||
      !location ||
      !aboutCompany ||
      !skillsRequired ||
      !information
    ) {
      return res
        .status(400)
        .json({ error: 'Provide all the required fields.' });
    }
    const lowercasedSkills = skillsRequired.map((skill) =>
      skill.trim().toLowerCase()
    );

    const newJobPost = await Job.create({
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOrOffice,
      location,
      aboutCompany,
      skillsRequired: lowercasedSkills,
      information,
    });

    const newJob = await newJobPost.save();

    res.status(200).json({ message: 'Job created successfully !' });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: 'Something went wrong, please try again later.' });
  }
});
module.exports = router;
