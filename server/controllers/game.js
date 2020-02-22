'use strict';

const debug = require('debug')('idle-capitalist-server:controller');
const util = require('../util');
const clientCommands = require('../commands/client');
const serverCommands = require('../commands/server');
const GameCommandsManager = require('../events/game');

class GameController {

  constructor(ws) {
    this.ws = ws;
    this.gameCommandsManager = GameCommandsManager(ws);
  }

  onMessage(message) {
    try {
      const parsedMessage = JSON.parse(message);

      if (Object.values(serverCommands).includes(parsedMessage.command)) {
        debug(`command: ${parsedMessage.command} payload: ${parsedMessage.payload}`);
        this.gameCommandsManager.execCommand(parsedMessage.command, parsedMessage.payload);
      } else {
        this.ws.send(util.clientCommand(clientCommands.INVALID_COMMAND, parsedMessage.command));
      }
    } catch(err) {
      debug(err);
      this.ws.send(util.clientCommand(clientCommands.SERVER_ERROR, err.stack));
    }
  }

  close() {
    // update last game date
  }
}

module.exports = GameController;
