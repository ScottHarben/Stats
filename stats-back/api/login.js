const { Router } = require('express');
const dbConnection = require('../db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const loginRouter = Router();

const connection = dbConnection.dbConnection();
connection.connect();

loginRouter.post("/", (req, res) => {
  connection.query(
    "call spUserGet(?)",
    req.body.Username,
    (error, results) => {
      if (error) {
        console.error(error);
      } else {
        const user = results[0][0];
        if (user === undefined){
          res.status(403).send({
            success: false,
            message: "Invalid username or password",
          });
        } else {
          const passwordHash = user.PasswordHash;
          bcrypt.compare(req.body.Password, passwordHash, (err, result) => {
            if (err) {
              console.error(error);
            }
            if (result) {
              jwt.sign(
                { username: user.Username },
                "superSecret",
                (err, token) => {
                  if (err) {
                    console.error(err);
                  } else {
                    res.send({ username: req.body.Username, token: token });
                  }
                }
              );
            } else {
              res.status(403).send({
                success: false,
                message: "Invalid username or password",
              });
            }
          });
        }
      }
    }
  );
});

module.exports = {
  loginRouter,
};