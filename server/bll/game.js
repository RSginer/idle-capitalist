const Game = require('../db/models/game');

function GameBll() {

  async function buyBusiness(businessType) {
    return {
      ok: true
    }
  }

  return {
    buyBusiness
  }
}

module.exports = GameBll;
