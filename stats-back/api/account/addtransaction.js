const { Router } = require('express');
const db = require('../../db');
const jwt = require('jsonwebtoken');

const addTransactionRouter = Router();

const connection = db.dbConnection();
connection.connect();

addTransactionRouter.post("/", (req, res) => {
  const transaction = req.body.params.Transaction;
  const amount = req.body.params.Amount;
  const date = req.body.params.Date;
  const params = [transaction, amount, date]
  const token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, "superSecret", (err, decoded) => {
      if (err) console.log(err);
      else if (decoded) {
        connection.query("call spAccountAdd(?,?,?)", params, (error, results) => {
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
  addTransactionRouter,
};