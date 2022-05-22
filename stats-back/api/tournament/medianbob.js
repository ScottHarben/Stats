const { Router } = require('express');
const db = require('../../db')

const medianBoBRouter = Router();

const connection = db.dbConnection();
connection.connect();

medianBoBRouter.get("/", (req, res) => {
  const permNum = req.query.permNum;
  connection.query("call spTournamentStatsMedianBoBGet(?)", permNum, (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  medianBoBRouter,
};