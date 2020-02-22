'use strict';

const GameDTO = require('../db/models/game');
const debug = require('debug')('idle-capitalist-server:repository');

function GameRepository() {

  async function create(game) {
    const res = await GameDTO.create(game);
    debug('GameRepository.create', res);
    return res;
  }

  async function findOne() {
    const res = await GameDTO.findOne();
    debug('GameRepository.findOne', res);
    return res;
  }

  return {
    create,
    findOne
  }
}

module.exports = GameRepository;