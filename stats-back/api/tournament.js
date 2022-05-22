const { Router } = require('express')
const { selectRouter } = require('./tournament/select')
const { medianScoreRouter } = require('./tournament/medianscore')
const { medianBoBRouter } = require('./tournament/medianbob');
const { getProjectionsRouter } = require('./tournament/getprojections');

const tournamentRouter = Router();

tournamentRouter.use('/select', selectRouter);
tournamentRouter.use('/medianscore', medianScoreRouter);
tournamentRouter.use('/medianbob', medianBoBRouter);
tournamentRouter.use('/getprojections', getProjectionsRouter);

module.exports = {
  tournamentRouter,
}