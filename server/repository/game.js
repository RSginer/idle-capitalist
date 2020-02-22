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
    const res = await GameDTO.findOne().populate('businesses');
    debug('GameRepository.findOne', res);
    return res;
  }

  async function save(game) {
    return await game.save();
  }

  return {
    create,
    findOne,
    save
  }
}

module.exports = GameRepository;