const { Router } = require('express');
const db = require('../../db')

const getBetsRouter = Router();

const connection = db.dbConnection();
connection.connect();

getBetsRouter.get("/", (req, res) => {
  connection.query("call spBetGet()", (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  getBetsRouter,
};