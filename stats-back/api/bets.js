const { Router } = require('express');
const { addBetRouter } = require('./bets/addbet');
const { getBetsRouter } = require('./bets/getbets');

const betsRouter = Router();

betsRouter.use('/addbet', addBetRouter);
betsRouter.use('/getbets', getBetsRouter);

module.exports = {
  betsRouter,
}