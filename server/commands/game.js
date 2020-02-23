'use strict';

const EventEmitter = require('events');
const clientCommands = require('./types/client');
const serverCommands = require('./types/server');
const util = require('../util');
const gameBll = require('../bll/game')();

const debug = require('debug')('idle-capitalist-server:events');

function GameCommandsManager(ws) {

  const eventEmitter = new EventEmitter();

  // Listen Events
  eventEmitter.on(serverCommands.BUY_BUSINESS, onBuyBusiness)
  eventEmitter.on(serverCommands.MANAGE_ORDER, onManageOrder)


  // Methods
  async function onBuyBusiness(businessKey) {
    debug(`Buying business ${businessKey}...`);
    try {
      const buyBusinessResult = await gameBll.buyBusiness(businessKey)

      if (buyBusinessResult) {
        ws.send(util.clientCommand(clientCommands.BUY_BUSINESS_SUCCESS, buyBusinessResult));
        debug(`Buy business success for ${businessKey}!`);

      }

    } catch (err) {
      debug(err)
      ws.send(util.clientCommand(clientCommands.BUY_BUSINESS_ERROR, err));
    }
  }

  async function onManageOrder(businessKey) {
    debug(`Managing order for ${businessKey}...`);
    try {
      const manageOrderResult = await gameBll.manageOrder(businessKey)

      if (manageOrderResult) {
        ws.send(util.clientCommand(clientCommands.MANAGE_ORDER_SUCCESS, manageOrderResult));
        debug(`Managed order success for ${businessKey}!`);
      }

    } catch (err) {
      debug(err)
      ws.send(util.clientCommand(clientCommands.MANAGE_ORDER_ERROR, err));
    }
  }

  // Public API
  function execCommand(command, payload) {
    eventEmitter.emit(command, payload);
  }

  return {
    execCommand
  }

}

module.exports = GameCommandsManager;