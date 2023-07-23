const mongoose = require('mongoose');
const Job = require('../models/Job');
const express = require('express');

const router = express.Router();

router.get('/job/:id', async (req, res) => {
  try {
    const id = '64bc24aabef21f2e0590071c';

    const job = await Job.findById(id);
    console.log(job);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    return res.status(200).json({ job });
  } catch (error) {
    console.error('Error during Register: ' + error.message);
    return res
      .status(500)
      .json({ error: 'Something went wrong, please try again later.' });
  }
});
module.exports = router;
