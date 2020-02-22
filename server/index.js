'use strict';

const debug = require('debug')('idle-capitalist-server:http');
const session = require('express-session');
const express = require('express');
const http = require('http');
const uuid = require('uuid');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();

const GameController = require('./controller/game');

// Map to store websockets for each user
const map = new Map();

app.use(cors());
//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
  saveUninitialized: false,
  secret: '$eCuRiTy',
  resave: false
});

app.use(sessionParser);

app.post('/initGame', function (req, res) {

  return res.send({ userId: 1 });
});


const server = http.createServer(app);
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

server.on('upgrade', function (request, socket, head) {
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', function (ws, request) {
  const gameController = new GameController(ws);


  ws.on('message', function (message) {
    gameController.onMessage(message);
  });

  ws.on('close', function () {
    gameController.close();
  });
});


server.listen(3001, function () {
  debug('Listening on http://localhost:3001');
});
