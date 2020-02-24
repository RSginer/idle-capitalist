'use strict';

const debug = require('debug')('idle-capitalist-server:service');
const GameRepository = require('../repository/game');
const BusinessRepository = require('../repository/business');
const util = require('../util')

const config = require('config');
const gameRepository = GameRepository();
const businessRepository = BusinessRepository();

function GameService() {

  async function initGame() {
    let currentGame;
    let isNewGame = false;
    let revenue = 0;
    let time = 0;
    let hasManagers = false;

    currentGame = await gameRepository.findOne();

    if (!currentGame) {
      isNewGame = true;
      const newGame = config.get('initialGameState');
      newGame.lastConnectionClosedDateInMs = Date.now();
      currentGame = await gameRepository.create(config.get('initialGameState'))
    }

    if (!isNewGame) {
      time = Date.now() - currentGame.lastConnectionClosedDateInMs;
      const businessesConfig = config.get(`businesses`);
      const businesses = await businessRepository.find();
      revenue = 0;
      
      if (businesses && businesses.length > 0) {
        businesses.map((business) => {
          if (business.manager === true) {
            hasManagers = true;
            const initialProductivity = businessesConfig[business.businessKey].initialProductivity;
            revenue = util.getBusinessRevenue(initialProductivity, business.level, time);
          }
        })
      }

      const totalCashAmount = currentGame.totalCashAmount;
      currentGame.lastConnectionClosedDateInMs = Date.now();
      currentGame.totalCashAmount = Math.round((totalCashAmount + revenue) * 100) / 100;
      await gameRepository.save(currentGame); 
    }

    const result = {
      currentGame,
      isNewGame,
      idleRevenue: revenue,
      idleTime: time,
      hasManagers
    }

    return result;
  }

  async function buyBusiness(businessKey) {
    await updateLastConnectionTime(Date.now());
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
  }

  // Manage Order
  async function manageOrder(businessKey, finishDateInMs) {
    await updateLastConnectionTime(Date.now());
    const businessesConfig = config.get(`businesses`);
    const currentGame = await gameRepository.findOne();
    const business = await businessRepository.findByBusinessKey(businessKey);
    const initialTime = businessesConfig[businessKey].initialTime;
    const initialProductivity = businessesConfig[businessKey].initialProductivity;

    if ((finishDateInMs - business.lastOrderStarted) >= initialTime) {
      let profit = util.getBusinessRevenue(initialProductivity, business.level, initialTime)
      let totalCashAmount = currentGame.totalCashAmount + profit;
  
      currentGame.totalCashAmount = Math.round(totalCashAmount * 100) / 100;
      await gameRepository.save(currentGame);
    } else {
      throw new Error('The Order is not finished yet!')
    }

    return currentGame.totalCashAmount;
  }

  async function manageOrderStart(businessKey, startDateInMs) {
    await updateLastConnectionTime(Date.now());
    const business = await businessRepository.findByBusinessKey(businessKey);

    if (business) {
      business.lastOrderStarted = startDateInMs;
      await businessRepository.save(business);
    }
  }

  // Expand business
  async function expandBusiness(businessKey) {
    await updateLastConnectionTime(Date.now());
    const businessesConfig = config.get(`businesses`);
    const currentGame = await gameRepository.findOne();
    let business = await businessRepository.findByBusinessKey(businessKey);
    const rateGrowth = businessesConfig[businessKey].coefficient;
    const costBase = businessesConfig[businessKey].initialCost;
    const cost = util.getNextExpandCost(costBase, business.level, rateGrowth);
    const totalCashAmount = Math.round(((currentGame.totalCashAmount) - cost) * 100) / 100;

    if (totalCashAmount >= 0) {
      currentGame.totalCashAmount = totalCashAmount;

      await gameRepository.save(currentGame);

      business.level += 1;

      await businessRepository.save(business)
    } else {
      throw new Error(`You don't have money to buy this`)
    }

    return business;
  }

  // Hire Manager
  async function hireManager(businessKey) {
    await updateLastConnectionTime(Date.now());
    const businessesConfig = config.get(`businesses`);
    const currentGame = await gameRepository.findOne();
    const business = await businessRepository.findByBusinessKey(businessKey);

    const managerPrice = businessesConfig[businessKey].managerPrice;
    const totalCashAmount = currentGame.totalCashAmount;

    if (totalCashAmount >= managerPrice) {
      currentGame.totalCashAmount = Math.round((totalCashAmount - managerPrice) * 100) / 100;

      await gameRepository.save(currentGame);
      business.manager = true;
      await businessRepository.save(business)

      return business;
    } else {
      throw new Error(`You don't have money to buy this`)
    }
  }

  // Connection close
  async function updateLastConnectionTime(ms) {
    const currentGame = await gameRepository.findOne();
    currentGame.lastConnectionClosedDateInMs = ms;

    await gameRepository.save(currentGame);
  }

  return {
    initGame,
    buyBusiness,
    manageOrder,
    manageOrderStart,
    expandBusiness,
    hireManager,
    updateLastConnectionTime
  }
}

module.exports = GameService;
