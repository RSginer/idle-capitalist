'use strict';

const debug = require('debug')('idle-capitalist-server:controller');
const util = require('../../util');
const clientCommands = require('../../commands/types/client');
const serverCommands = require('../../commands/types/server');
const GameCommandsManager = require('../../commands/game');


function GameWebsocketController(ws) {
  const gameCommandsManager = GameCommandsManager(ws);

  function onMessage(message) {
    try {
      const parsedMessage = JSON.parse(message);

      if (Object.values(serverCommands).includes(parsedMessage.command)) {
        debug(`command: ${parsedMessage.command} payload: ${parsedMessage.payload}`);
        gameCommandsManager.execCommand(parsedMessage.command, parsedMessage.payload);
      } else {
        if (!parsedMessage.command) {
          parsedMessage.command = 'undefined';
        }
        ws.send(util.clientCommand(clientCommands.INVALID_COMMAND, parsedMessage.command));
      }
    } catch(err) {
      debug(err);
      this.ws.send(util.clientCommand(clientCommands.SERVER_ERROR, err.stack));
    }
  }

  function close() {
    // update last game date
  }
  return {
    onMessage,
    close
  }
}


module.exports = GameWebsocketController;
