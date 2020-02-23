'use strict';

function clientCommand(command, payload) {
  return `{"type": "${command}", "payload": ${JSON.stringify(payload)}}`;
}

module.exports = {
  clientCommand
}

