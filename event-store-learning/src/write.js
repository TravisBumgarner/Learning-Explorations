const { EventStoreDBClient, jsonEvent } = require('@eventstore/db-client')
const { v4: uuidv4 } = require('uuid')

const client = new EventStoreDBClient({ endpoint: 'localhost:2113' }, { insecure: true },);


let i = 0

setInterval(async () => {
    const event = jsonEvent({
        type: "TestEvent",
        data: {
            entityId: uuidv4(),
            importantData: `Event #: ${i}`,
        },
    });
    i += 1
    console.log('new event with id', event.data.entityId)
    await client.appendToStream("my-demo-stream", event);
}, 1000)
