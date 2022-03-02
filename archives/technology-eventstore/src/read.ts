import { BACKWARDS, END } from '@eventstore/db-client';
import { client } from './database'

setInterval(async () => {
    const events = await client.readStream("my-demo-stream", {
        direction: BACKWARDS,
        fromRevision: END,
        maxCount: 1,
    });

    for await (const resolvedEvent of events) {
        console.log(resolvedEvent.event?.data);
    }
}, 1000)