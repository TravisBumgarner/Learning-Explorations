import { FORWARDS, START, StreamingRead, ResolvedEvent } from '@eventstore/db-client';
import { client } from './client'

import { InventoryEvent } from './types';

const summarizeData = (entries: InventoryEvent[]) => {
    return entries.reduce((accumulator, entry) => {
        if (accumulator[entry.data.sku] == undefined) {
            accumulator[entry.data.sku] = 0
        }
        accumulator[entry.data.sku] += entry.data.quantity
        return accumulator
    }, {} as Record<string, number>)
}

const read = async () => {
    const events: StreamingRead<ResolvedEvent<InventoryEvent>> = await client.readStream("inventory-stream", {
        direction: FORWARDS,
        fromRevision: START,
    });
    const data: InventoryEvent[] = []
    for await (const resolvedEvent of events) {
        if (resolvedEvent.event) {
            data.push(resolvedEvent.event);
        }
    }
    return summarizeData(data)
}

if (require.main === module) {
    read()
}

export { summarizeData }
export default read