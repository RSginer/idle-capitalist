'use strict';

const EventEmitter = require('events');
const clientCommands = require('../command/client');
const serverCommands = require('../command/server');

const debug = require('debug')('idle-capitalist-server:events');

function GameCommandsManager(ws) {

  const eventEmitter = new EventEmitter();

  // Listen Events
  eventEmitter.on(serverCommands.BUY_BUSINESS, onBuyBusiness)


  function onBuyBusiness(businessType) {
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