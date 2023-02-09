const { Router } = require('express');
const db = require('../../db');
const jwt = require('jsonwebtoken');

const rebuildProjectionsRouter = Router();

const connection = db.dbConnection();
connection.connect();

rebuildProjectionsRouter.post("/", (req, res) => {
  const token = req.headers["x-access-token", "Access-Control-Allow-Origin"];
  if (token) {
    jwt.verify(token, "superSecret", (err, decoded) => {
      if (err) console.log(err);
      else if (decoded) {
        connection.query("call spRebuildProjections()", (error, results) => {
          if (error) {
            return console.error(error.message);
          } else {
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
  rebuildProjectionsRouter,
};