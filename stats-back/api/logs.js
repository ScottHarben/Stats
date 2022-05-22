const { Router } = require('express');
const dbConnection = require('../db')

const logsRouter = Router();

const connection = dbConnection.dbConnection();
connection.connect();

logsRouter.get("/", (req, res) => {
  connection.query("call spLogGet()", (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  logsRouter,
};