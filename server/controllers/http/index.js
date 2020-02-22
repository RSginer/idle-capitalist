
class GameHttpController {

  async initGame(req, res) {
    return res.send({userId: 1})
  }
}

module.exports = GameHttpController;
