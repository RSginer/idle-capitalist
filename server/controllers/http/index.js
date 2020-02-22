const debug = require('debug')('idle-capitalist-server:controller');

const GameBll = require('../../bll/game');

function GameHttpController() {

  const gameBll = GameBll();

  async function initGame(req, res) {
    try {
      const currentGame = await gameBll.initGame();
      return res.send(currentGame);
    } catch (err) {
      debug(err)
      res.status(500);
      return res.send(err)
    }
  }

  return {
    initGame
  }
}

module.exports = GameHttpController;
