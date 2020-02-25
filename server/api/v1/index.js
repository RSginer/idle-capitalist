const express = require('express')
const AuthRouter = require('./router/auth')
const GameRouter = require('./router/game')

function ApiV1Router () {
  const router = express.Router()

  router.use('/auth', AuthRouter())
  router.use('/game', GameRouter())

  return router
}

module.exports = ApiV1Router
