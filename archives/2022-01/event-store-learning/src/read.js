const { EventStoreDBClient, jsonEvent, FORWARDS, START, BACKWARDS, END } = require('@eventstore/db-client')

const client = new EventStoreDBClient({ endpoint: 'localhost:2113' }, { insecure: true },);



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
