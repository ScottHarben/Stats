const express = require("express");
const cors = require("cors");
//require("dotenv").config({ path: '../.env' });

const port = process.env.PORT;
const host = process.env.VIRTUAL_HOST;
const app = express();

app.use(express.json());
app.use(cors());

const { apiRouter } = require('./api');

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`stats-back listening at http://${host}:${port}`);
});