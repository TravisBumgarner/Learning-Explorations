let WSServer = require('ws').Server;
import { createServer } from 'http'
import { createClient } from 'redis';

const server = createServer()

let wsServer = new WSServer({ server })

const NEW_MESSAGES = 'newMessages'
const CURRENT_MESSAGES = 'currentMessages'

wsServer.on('connection', async (ws) => {
  const subscriber = await createClient()
  await subscriber.connect();

  const publisher = await createClient()
  await publisher.connect()

  const currentMessages = await subscriber.lRange(CURRENT_MESSAGES, 0, -1)
  await ws.send(JSON.stringify(currentMessages));

  await subscriber.subscribe(NEW_MESSAGES, (message) => {
    ws.send(JSON.stringify(message));
  });

  ws.on('message', async (message) => {
    const [_a, _b] = await publisher
      .multi()
      .publish(NEW_MESSAGES, message)
      .rPush(CURRENT_MESSAGES, message)
      .exec();
  });
});

server.listen(8080, () => console.log(`http/ws server listening on ${8080}`));