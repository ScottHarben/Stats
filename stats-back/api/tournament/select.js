const { Router } = require('express');
const db = require('../../db')

const selectRouter = Router();

const connection = db.dbConnection();
connection.connect();

selectRouter.get("/", (req, res) => {
  connection.query("call spTournamentSelectGet()", (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  selectRouter,
};