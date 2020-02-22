'use strict';

function clientCommand(command, payload) {
  return `{"type": "[Server] ${command}", "payload": ${JSON.stringify(payload)}}`;
}

module.exports = {
  clientCommand
}

