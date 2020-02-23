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


  // Methods
  async function onBuyBusiness(businessType) {
    try {
      const buyBusinessResult = await gameBll.buyBusiness(businessType)

      if (buyBusinessResult) {
        ws.send(util.clientCommand(clientCommands.BUY_BUSINESS_SUCCESS, buyBusinessResult));
      }

      } catch (err) {
      ws.send(util.clientCommand(clientCommands.BUY_BUSINESS_ERROR, err));
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