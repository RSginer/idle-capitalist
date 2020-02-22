'use strict';

const debug = require('debug')('idle-capitalist-server:http');
const session = require('express-session');
const express = require('express');
const http = require('http');
const uuid = require('uuid');
const WebSocket = require('ws');
const cors = require('cors');
const app = express();
const config = require('config');

const setupDB = require('./db');

setupDB(`${config.get('db.protocol')}${config.get('db.host')}:${config.get('db.port')}/${config.get('db.database')}`);

const GameController = require('./controllers/ws');

app.use(cors());

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
  debug('ws connection start');
  const gameController = new GameController(ws);

  ws.on('message', function (message) {
    debug('ws message');
    gameController.onMessage(message);
  });

  ws.on('close', function () {
    gameController.close();
    debug('ws connection close');
  });
});


server.listen(3001, function () {
  debug('Listening on http://localhost:3001');
});
