const { Router } = require('express');
const db = require('../../db')

const getProjectionsRouter = Router();

const connection = db.dbConnection();
connection.connect();

getProjectionsRouter.get("/", (req, res) => {
  connection.query("call spPrizePicksProjectionGet()", (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  getProjectionsRouter,
};