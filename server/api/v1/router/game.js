const express = require('express')
const gameHttpController = require('../../../controllers/http/index')()

function GameRouter () {
  const router = express.Router()

  router.get('/initialGameState', gameHttpController.initGame)

  return router
}

module.exports = GameRouter
