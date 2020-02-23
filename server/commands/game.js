'use strict';

const EventEmitter = require('events');
const clientCommands = require('./types/client');
const serverCommands = require('./types/server');
const util = require('../util');
const gameBll = require('../bll/game')();

const debug = require('debug')('idle-capitalist-server:commands');

function GameCommandsManager(ws) {

  const eventEmitter = new EventEmitter();

  // Listen Events
  eventEmitter.on(serverCommands.BUY_BUSINESS, onBuyBusiness)
  eventEmitter.on(serverCommands.MANAGE_ORDER, onManageOrder)
  eventEmitter.on(serverCommands.EXPAND_BUSINESS, onExpandBusiness)
  eventEmitter.on(serverCommands.HIRE_MANAGER, onHireManager);
  eventEmitter.on(serverCommands.CONNECTION_CLOSED, onConnectionClosed);

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
      debug(`Buy business error ${businessKey}!`, err)
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
      debug(`Manage order error ${businessKey}!`, err)
      ws.send(util.clientCommand(clientCommands.MANAGE_ORDER_ERROR, err));
    }
  }

  async function onExpandBusiness(businessKey) {
    debug(`Expanding business ${businessKey}...`);
    try {
      const expandBusinessResult = await gameBll.expandBusiness(businessKey);

      if (expandBusinessResult) {
        ws.send(util.clientCommand(clientCommands.EXPAND_BUSINESS_SUCCESS, expandBusinessResult));
        debug(`Expanded business ${businessKey}!`);
      }
    } catch (err) {
      debug(`Expanded business error ${businessKey}!`, err);
      ws.send(util.clientCommand(clientCommands.EXPAND_BUSINESS_ERROR, err));
    }
  }

  async function onHireManager(businessKey) {
    debug(`Hiring manager for business ${businessKey}...`);
    try {
      const hireManagerResult = await gameBll.hireManager(businessKey);

      if (hireManagerResult) {
        ws.send(util.clientCommand(clientCommands.HIRE_MANAGER_SUCCESS, hireManagerResult));
        debug(`Hired manager for business ${businessKey}!`);
      }
    } catch (err) {
      debug(`Hire manager error for business ${businessKey}`, err);
      ws.send(util.clientCommand(clientCommands.HIRE_MANAGER_ERROR, err));
    }
  }

  async function onConnectionClosed() {
    debug(`Client disconnected, updating last connection time...`);
    try {
      await gameBll.updateLastConnectionTime(Date.now())
    } catch (err) {
      debug('Updating last connection time error!', err);
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