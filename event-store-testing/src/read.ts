import { FORWARDS, START } from '@eventstore/db-client';
import { client } from './client'

const read = async () => {
    const events = await client.readStream("inventory-stream", {
        direction: FORWARDS,
        fromRevision: START,
    });

    for await (const resolvedEvent of events) {
        console.log(resolvedEvent.event?.data);
    }
}

if (require.main === module) {
    read()
}

export default read