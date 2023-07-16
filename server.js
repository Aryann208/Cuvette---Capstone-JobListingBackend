const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
