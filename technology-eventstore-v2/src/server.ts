import express from 'express';
import { jsonEvent, JSONEventType } from '@eventstore/db-client';

import eventstoreClient from './eventstore'

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

type TestEvent = JSONEventType<
    "TestEvent",
    {
        importantData: string;
    }
>;

app.get('/write', async(req: express.Request, res: express.Response) => {
    const event = jsonEvent < TestEvent > ({
        type: "TestEvent",
        data: {
            importantData: `Event #: ${Math.random()}`,
        },
    });
    await eventstoreClient.appendToStream("my-demo-stream", event);

    res.send(`write success! ${event.data.importantData}`)
  })

export default app

const port = 5001

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })