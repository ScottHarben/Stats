const { Router } = require('express');
const db = require('../../db')

const getUnassignedRouter = Router();

const connection = db.dbConnection();
connection.connect();

getUnassignedRouter.get("/", (req, res) => {
  const wildcard = req.query.wildcard;
  connection.query("call spPrizePicksPlayerUnassignedGet(?)", wildcard, (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  getUnassignedRouter,
};