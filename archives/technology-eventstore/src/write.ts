import { jsonEvent, JSONEventType } from '@eventstore/db-client';
import { client } from './database'

let i = 0

type TestEvent = JSONEventType<
    "TestEvent",
    {
        importantData: string;
    }
>;

setInterval(async () => {
    const event = jsonEvent < TestEvent > ({
        type: "TestEvent",
        data: {
            importantData: `Event #: ${i}`,
        },
    });
    i += 1
    console.log('new event with id', event.data.importantData)
    await client.appendToStream("my-demo-stream", event);
}, 1000)