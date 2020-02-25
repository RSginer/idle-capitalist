const express = require('express')

function AuthRouter () {
  const router = express.Router()

  router.post('/login', function (req, res) {
    console.log('Login')
  })

  return router
}

module.exports = AuthRouter
