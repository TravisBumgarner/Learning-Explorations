let WSServer = require('ws').Server;
import { createServer } from 'http'
import { createClient } from 'redis';

const server = createServer()

let wsServer = new WSServer({ server })

wsServer.on('connection', async (ws) => {
  const subscriber = await createClient()
  await subscriber.connect();

  await subscriber.subscribe('foo', (message) => {
    ws.send(JSON.stringify(message));
  });

  ws.on('message', (message) => {
    console.log(`received: ${message}`);
    ws.send(JSON.stringify(message));
  });
});

server.listen(8080, () => console.log(`http/ws server listening on ${8080}`));