'use strict';

const debug = require('debug')('idle-capitalist-server:bll');
const GameRepository = require('../repository/game');
const BusinessRepository = require('../repository/business');

const config = require('config');
const gameRepository = GameRepository();
const businessRepository = BusinessRepository();

function GameBll() {

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

        if (!business && currentGame.totalCashAmount >= businessesConfig[businessKey].initialCost) {
          currentGame.totalCashAmount -= businessesConfig[businessKey].initialCost;

          business = await businessRepository.create({
            businessKey: businessKey,
            level: 1,
            manager: false
          })

          currentGame.businesses.push(business.id);
          await gameRepository.save(currentGame);

        } else {
          throw new Error(`You don't have money to buy this`)
        }

        return business;
      } else {
        throw new Error('Invalid business type');
      }
    } catch (err) {
      debug(err);
    }

  }

  async function manageOrder(businessKey) {
    try {
      const businessesConfig = config.get(`businesses`);
      const currentGame = await gameRepository.findOne();
      const business = await businessRepository.findByBusinessKey(businessKey);
      
      // Calc revenue
      const initialTime = businessesConfig[businessKey].initialTime;
      const initialProductivity = businessesConfig[businessKey].initialProductivity;
      let profit = (initialProductivity * business.level) * (initialTime / 1000);
      let totalCashAmount = parseFloat(currentGame.totalCashAmount) + profit;
  
      currentGame.totalCashAmount = Math.round(totalCashAmount * 100) / 100;
      await gameRepository.save(currentGame);

      return currentGame.totalCashAmount;
    } catch (err) {
      debug(err);
    }
  }

  async function expandBusiness(businessKey) {
    try {
      const businessesConfig = config.get(`businesses`);
      const currentGame = await gameRepository.findOne();
      const business = await businessRepository.findByBusinessKey(businessKey);

      const rateGrowth = businessesConfig[businessKey].coefficient;

      // Fix initial cost for limonade
      const costBase = businessesConfig[businessKey].initialCost || 4;
      const owned = business.level;
      const cost = Math.round(costBase * Math.pow(rateGrowth, owned) * 100) / 100;

      const totalCashAmount = parseFloat(currentGame.totalCashAmount) - cost;

      if (totalCashAmount >= 0) {
        currentGame.totalCashAmount = totalCashAmount;

        await gameRepository.save(currentGame);
  
        business.level +=1;
  
        await businessRepository.save(business)
      } else {
        throw new Error(`You don't have money to buy this`)
      }

      return business;
    } catch(err) {
      debug(err);
    }
  }

  return {
    initGame,
    buyBusiness,
    manageOrder,
    expandBusiness
  }
}

module.exports = GameBll;
