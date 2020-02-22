'use strict';

const debug = require('debug')('idle-capitalist-server:controller');

class GameController {

  onMessage(ws, message) {
    const parsedMessage = JSON.parse(message);

    const clientAction = `{"type": "[Server] ${parsedMessage.command}", "payload": ${JSON.stringify(parsedMessage.payload)}}`;
    debug(clientAction)
    ws.send(clientAction);
  }
}

module.exports = GameController;
