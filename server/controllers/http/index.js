const debug = require('debug')('idle-capitalist-server:controller');

const GameBll = require('../../bll/game');
const config = require('config');

function GameHttpController() {

  const gameBll = GameBll();

  async function initGame(req, res) {
    try {
      const initGameResult = await gameBll.initGame();
      const businessesConfig = config.get('businesses');
      const firstBusinessConfigKey = Object.keys(businessesConfig)[0]
      const firstBusinessInitialTime = businessesConfig[firstBusinessConfigKey].initialTime;
      const response = {
        gameState: initGameResult.currentGame,
        businessesConfig,
        showIdleDialog: !initGameResult.isNewGame && initGameResult.idleTime > firstBusinessInitialTime && initGameResult.hasManagers,
        idleRevenue: initGameResult.idleRevenue,
        idleTime: initGameResult.idleTime
      }
      debug('GameHttpController.initGame', response);
      return res.json(response);
    } catch (err) {
      debug('GameHttpController.initGame ERROR', err)
      res.status(500);
      return res.send(err)
    }
  }

  return {
    initGame
  }
}

module.exports = GameHttpController;
