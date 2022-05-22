const { Router } = require('express');
const db = require('../../db')

const medianScoreRouter = Router();

const connection = db.dbConnection();
connection.connect();

medianScoreRouter.get("/", (req, res) => {
  const permNum = req.query.permNum;
  connection.query("call spTournamentStatsMedianScoreGet(?)", permNum, (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  medianScoreRouter,
};