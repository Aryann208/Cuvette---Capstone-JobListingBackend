const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;

const DB = process.env.MONGO_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((conn) => console.log('Database Connected'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
