const { Router } = require('express');
const db = require('../../db')

const getTransactionsRouter = Router();

const connection = db.dbConnection();
connection.connect();

getTransactionsRouter.get("/", (req, res) => {
  connection.query("call spAccountGet()", (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  getTransactionsRouter,
};