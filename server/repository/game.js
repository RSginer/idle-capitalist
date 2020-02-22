const GameDTO = require('../db/models/game');

function GameRepository() {

  async function create(game) {
    return await GameDTO.create(game);
  }

  async function findOne() {
    return await GameDTO.findOne();
  }

  return {
    create,
    findOne
  }
}

module.exports = GameRepository;