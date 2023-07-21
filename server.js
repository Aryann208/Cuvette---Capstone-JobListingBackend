const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;
const registerRoute = require('./routes/registerRoute');

const DB = process.env.MONGO_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((conn) => console.log('Database Connected'));

app.use(express.json());
app.get('/', (req, res) => res.status(200).send('Welcome'));
app.post('/register', registerRoute);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json('Something went wrong try again later');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
