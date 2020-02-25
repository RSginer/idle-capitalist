const express = require('express')
const gameHttpController = require('../../../controllers/http/index')()

function GameRouter () {
  const router = express.Router()

  router.post('/initGame', gameHttpController.initGame)

  return router
}

module.exports = GameRouter
