const express = require('express')

function ApiRouter (apiVersion) {
  const ApiEndpoints = require(`./v${apiVersion}`)
  const router = express.Router()

  router.use(`/v${apiVersion}`, ApiEndpoints())

  return router
}

module.exports = ApiRouter
