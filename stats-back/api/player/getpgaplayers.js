const { Router } = require('express');
const db = require('../../db')

const getPGAPlayerRouter = Router();

const connection = db.dbConnection();
connection.connect();

getPGAPlayerRouter.get("/", (req, res) => {
  const wildcard = req.query.wildcard;
  connection.query("call spPlayerGet(?)", wildcard, (error, results) => {
    if (error) {
      return console.error(error.message);
    } else {
      res.send(results[0]);
    }
  });
});

module.exports = {
  getPGAPlayerRouter,
};