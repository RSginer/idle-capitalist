'use strict';

const debug = require('debug')('idle-capitalist-server:bll');
const GameRepository = require('../repository/game');
const config = require('config');

function GameBll() {

  const gameRepository = GameRepository();
  debug(gameRepository)

  async function initGame() {
    let currentGame;

    try {
      currentGame = await gameRepository.findOne();
      debug(currentGame)
    } catch (err) {
      debug(err)
    }

    if (!currentGame) {
      currentGame = gameRepository.create(config.get('initialGameState'))
    }

    // TODO: get leave earning

   return currentGame;
  }

  async function buyBusiness(businessType) {
    const businessesConfig = config.get(`businesses`);

    if (Object.keys(businessesConfig).includes(businessType)) {
      // TODO: save business
      return businessType;
    } else {
      throw new Error('Invalid business type');
    }
  }

  return {
    initGame,
    buyBusiness
  }
}

module.exports = GameBll;
