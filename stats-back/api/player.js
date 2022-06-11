const { Router } = require('express');
const { assignPlayerRouter } = require('./player/assignplayer');
const { getPGAPlayerRouter } = require('./player/getpgaplayers');
const { getUnassignedRouter } = require('./player/getunassigned');
const { rebuildProjectionsRouter } = require('./player/rebuildprojections');

const playerRouter = Router();

playerRouter.use('/getunassigned', getUnassignedRouter);
playerRouter.use('/getpgaplayers', getPGAPlayerRouter);
playerRouter.use('/assignplayer', assignPlayerRouter);
playerRouter.use('/rebuildprojections', rebuildProjectionsRouter);

module.exports = {
  playerRouter,
}