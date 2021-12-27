let WSServer = require('ws').Server;
import { createServer } from 'http'
const server = createServer()

let wsServer = new WSServer({ server })

wsServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    ws.send(JSON.stringify(message));
  });
});

server.listen(8080, () => console.log(`http/ws server listening on ${8080}`));