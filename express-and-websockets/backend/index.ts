// From here: https://stackoverflow.com/questions/34808925/express-and-websocket-listening-on-the-same-port

import express from 'express'
let WSServer = require('ws').Server;
import { createServer } from 'http'
const server = createServer()

let app = express();
let wsServer = new WSServer({ server });

app.get('/', function (req, res) {
  res.send('hi')
});

server.on('request', app);

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    ws.send(JSON.stringify(message));
  });
});

server.listen(8080, () => console.log(`http/ws server listening on ${8080}`));