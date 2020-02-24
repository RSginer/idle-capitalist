'use strict';

const debug = require('debug')('idle-capitalist-server:controller');
const util = require('../../util');
const clientCommands = require('../../cqrs/types/client');
const serverCommands = require('../../cqrs/types/server');
const GameCQRSManager = require('../../cqrs/game');


function GameWebsocketController(ws) {
  const gameCQRSManager = GameCQRSManager(ws);

  function onMessage(message) {
    try {
      const parsedMessage = JSON.parse(message);

      if (Object.values(serverCommands).includes(parsedMessage.command)) {
        debug(`command: ${parsedMessage.command} payload: ${parsedMessage.payload}`);
        gameCQRSManager.execCommand(parsedMessage.command, parsedMessage.payload);
      } else {
        if (!parsedMessage.command) {
          parsedMessage.command = 'undefined';
        }
        ws.send(util.clientCommand(clientCommands.INVALID_COMMAND, parsedMessage.command));
        debug(`Invalid command ${parsedMessage.command} with payload ${parsedMessage.payload}`)
      }
    } catch(err) {
      debug(err);
      this.ws.send(util.clientCommand(clientCommands.SERVER_ERROR, err.stack));
    }
  }

  function close() {
    gameCQRSManager.execCommand(serverCommands.CONNECTION_CLOSED)
  }
  return {
    onMessage,
    close
  }
}


module.exports = GameWebsocketController;
