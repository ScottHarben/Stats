const { Router } = require('express');
const { addTransactionRouter } = require('./account/addtransaction');
const { getTransactionsRouter } = require('./account/gettransactions');

const accountRouter = Router();

accountRouter.use('/addtransaction', addTransactionRouter);
accountRouter.use('/gettransactions', getTransactionsRouter);

module.exports = {
  accountRouter,
}