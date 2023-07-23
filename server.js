const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;
const jwtAuthMiddleware = require('./middlewares/authMiddleware');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const jobpostRoute = require('./routes/jobpostRoute');
const updateJobpostRoute = require('./routes/updateJobpostRoute');
const jobfilterRoute = require('./routes/jobfilterRoute');
const jobdetailRoute = require('./routes/jobdetailRoute');
const DB = process.env.MONGO_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((conn) => console.log('Database Connected'));

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => res.status(200).send('Welcome'));
app.get('/job', jobfilterRoute);
app.get('/job/:id', jobdetailRoute);
app.post('/register', registerRoute);
app.post('/login', loginRoute);
app.post('/job-post', jwtAuthMiddleware, jobpostRoute);
app.put('/job-post/:id', jwtAuthMiddleware, updateJobpostRoute);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong try again later' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
