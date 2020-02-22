const debug = require('debug')('idle-capitalist-server:controller');

const GameBll = require('../../bll/game');
const config = require('config');

function GameHttpController() {

  const gameBll = GameBll();

  async function initGame(req, res) {
    try {
      const currentGame = await gameBll.initGame();
      const businessesConfig = config.get('businesses');
      const response = {
        gameState: currentGame,
        businessesConfig
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
