const { Router } = require('express')
const { logsRouter } = require('./logs');
const { playerRouter } = require('./player');
const { tournamentRouter } = require('./tournament')
const { loginRouter } = require('./login')
const { betsRouter } = require('./bets')
const { accountRouter } = require('./account')

const apiRouter = Router();

apiRouter.use('/logs', logsRouter);
apiRouter.use('/tournament', tournamentRouter);
apiRouter.use('/player', playerRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/bets', betsRouter);
apiRouter.use('/account', accountRouter);

module.exports = {
  apiRouter,
}