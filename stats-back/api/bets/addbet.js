const { Router } = require('express');
const db = require('../../db');
const jwt = require('jsonwebtoken');

const addBetRouter = Router();

const connection = db.dbConnection();
connection.connect();

addBetRouter.post("/", (req, res) => {
  const permNum = req.body.params.PermNum;
  const year = req.body.params.Year;
  const round = req.body.params.Round;
  const betNumber = req.body.params.BetNumber;
  const picks = req.body.params.Picks;
  const correctPicks = req.body.params.CorrectPicks;
  const wager = req.body.params.Wager;
  const multiplier = req.body.params.Multiplier;
  const hit = req.body.params.Hit;
  const reduced = req.body.params.Reduced;
  const params = [permNum, year, round, betNumber, picks, correctPicks, wager, multiplier, hit, reduced]
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "superSecret", (err, decoded) => {
      if (err) console.log(err);
      else if (decoded) {
        connection.query("call spBetAdd(?,?,?,?,?,?,?,?,?,?)", params, (error, results) => {
          if (error) {
            return console.error(error.message);
          } else {
            res.send(results[0]);
          }
        });
      }
      else console.log("failed varification");
    });
  } else {
    console.log("forbidden");
  }
});

module.exports = {
  addBetRouter,
};