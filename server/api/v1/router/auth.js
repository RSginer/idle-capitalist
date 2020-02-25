const express = require('express')

function AuthRouter () {
  const router = express.Router()

  router.post('/login', function (req, res) {
    // TODO: implement authentication

    console.log('Login')
  })

  return router
}

module.exports = AuthRouter
