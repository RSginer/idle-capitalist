'use strict';

const debug = require('debug')('idle-capitalist-server:bll');
const GameRepository = require('../repository/game');
const BusinessRepository = require('../repository/business');

const config = require('config');

function GameBll() {

  const gameRepository = GameRepository();
  const businessRepository = BusinessRepository();

  async function initGame() {
    let currentGame;

    try {
      currentGame = await gameRepository.findOne();
    } catch (err) {
      debug(err)
    }

    if (!currentGame) {
      currentGame = gameRepository.create(config.get('initialGameState'))
    }

    // TODO: get leave earning

   return currentGame;
  }

  async function buyBusiness(businessKey) {
    try {
      const businessesConfig = config.get(`businesses`);
      const currentGame = await gameRepository.findOne();
  
      if (Object.keys(businessesConfig).includes(businessKey)) {
        let business = await businessRepository.findByBusinessKey(businessKey);
  
        if (!business && currentGame.totalCashAmount >= businessesConfig[businessKey].price) {
          currentGame.totalCashAmount -= businessesConfig[businessKey].price;
  
          business = await businessRepository.create({
            businessKey: businessKey,
            level: 1,
            managers: []
          })
  
          currentGame.businesses.push(business.id);
          await gameRepository.save(currentGame);

        }
        debug(business)
        return business;
      } else {
        throw new Error('Invalid business type');
      }
    } catch (err) {
      debug(err);
    }

  }

  return {
    initGame,
    buyBusiness
  }
}

module.exports = GameBll;
