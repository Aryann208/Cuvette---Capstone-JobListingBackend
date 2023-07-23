const mongoose = require('mongoose');
const express = require('express');
const Job = require('../models/Job');
const jwtAuthMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.put('/job-post/:id', async (req, res) => {
  const id = req.params.id;
  const updateableFields = req.body;
  console.log(updateableFields);

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(400).json({ error: 'Job not found' });
    }
    for (const field in updateableFields) {
      if (updateableFields.hasOwnProperty(field) && job[field] !== undefined) {
        job[field] = updateableFields[field];
      }
    }

    await job.save();
    const jobUp = await Job.findById(id);
    console.log(jobUp);
    return res.status(200).json({ message: 'Job updated successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Something went wrong . Please try again later .' });
  }
});
module.exports = router;
