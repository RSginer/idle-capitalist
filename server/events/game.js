'use strict';

const EventEmitter = require('events');
const clientCommands = require('../commands/client');
const serverCommands = require('../commands/server');

const gameBll = require('../bll/game')();

const debug = require('debug')('idle-capitalist-server:events');

function GameCommandsManager(ws) {

  const eventEmitter = new EventEmitter();

  // Listen Events
  eventEmitter.on(serverCommands.BUY_BUSINESS, onBuyBusiness)


  async function onBuyBusiness(businessType) {
    debug(businessType)
  }

  function execCommand(command, payload) {
    eventEmitter.emit(command, payload);
  }

  return {
    execCommand
  }

}

module.exports = GameCommandsManager;