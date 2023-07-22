const mongoose = require('mongoose');
const Job = require('../models/Job');
const express = require('express');

const router = express.Router();

router.get('/job', async (req, res) => {
  try {
    const { skillsRequired, jobPosition } = req.query;

    const filter = {};
    if (skillsRequired) {
      filter.skillsRequired = { $in: skillsRequired.split(',') };
    }
    if (jobPosition) {
      filter.jobPosition = { $regex: new RegExp(jobPosition, 'i') };
    }
    console.log(filter);
    const jobs = await Job.find(filter);

    return res.status(200).json({ message: 'success', jobs });
  } catch (error) {
    console.error('Error during Register: ' + error.message);
    return res
      .status(500)
      .json({ error: 'Something went wrong, please try again later.' });
  }
});
module.exports = router;
