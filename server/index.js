'use strict'

const debug = require('debug')('idle-capitalist-server:interface')
const session = require('express-session')
const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')
const app = express()
const config = require('config')
const setupDB = require('./db')
const api = require('./api')

app.use(cors())

const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false
})

app.use(sessionParser)

app.use('/api', api(config.get('apiVersion')))

const server = http.createServer(app)

// Websocket
const GameWebsocketController = require('./controllers/ws')
const wss = new WebSocket.Server({ clientTracking: false, noServer: true })

server.on('upgrade', function (request, socket, head) {
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit('connection', ws, request)
  })
})

wss.on('connection', function (ws, request) {
  debug('ws connection start')
  const gameController = GameWebsocketController(ws)

  ws.on('message', function (message) {
    debug('ws message')
    gameController.onMessage(message)
  })

  ws.on('close', function () {
    gameController.close()
    debug('ws connection close')
  })
})

setupDB(`${config.get('db.protocol')}${process.env.DOCKER ? 'mongodb' : config.get('db.host')}:${config.get('db.port')}/${config.get('db.database')}`).then(() => {
  server.listen(3001, function () {
    debug('Listening on http://localhost:3001')
  })
})
  .catch((err) => debug('Database connection error', err))
