const { Router } = require('express');
const db = require('../../db');
const jwt = require('jsonwebtoken');

const assignPlayerRouter = Router();

const connection = db.dbConnection();
connection.connect();

assignPlayerRouter.post("/", (req, res) => {
  const playerId = req.body.params.PlayerId;
  const prizePicksPlayerId = req.body.params.PrizePicksPlayerId;
  const params = [playerId, prizePicksPlayerId]
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "superSecret", (err, decoded) => {
      if (err) console.log(err);
      else if (decoded) {
        connection.query("call spPlayerAssign(?,?)", params, (error, results) => {
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
  assignPlayerRouter,
};