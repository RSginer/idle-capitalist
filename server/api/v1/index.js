const express = require('express')
const GameRouter = require('./router/game')

function ApiV1Router () {
  const router = express.Router()

  router.use('/game', GameRouter())

  return router
}

module.exports = ApiV1Router
