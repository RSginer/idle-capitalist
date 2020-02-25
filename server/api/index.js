const express = require('express')

function ApiRouter (apiVersion) {
  const ApiEndpoints = require(`./v${apiVersion}`)
  const router = express.Router()

  router.use('/v1', ApiEndpoints())

  return router
}

module.exports = ApiRouter
