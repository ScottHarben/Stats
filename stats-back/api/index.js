const { Router } = require('express')
const { logsRouter } = require('./logs');
const { playerRouter } = require('./player');
const { tournamentRouter } = require('./tournament')
const { loginRouter } = require('./login')

const apiRouter = Router();

apiRouter.use('/logs', logsRouter);
apiRouter.use('/tournament', tournamentRouter);
apiRouter.use('/player', playerRouter);
apiRouter.use('/login', loginRouter);

module.exports = {
  apiRouter,
}