import { jsonEvent } from '@eventstore/db-client';
import { client } from './client'

import { InventoryEvent } from './types';

const write = async (sku: string, quantity: number) => {
    const event = jsonEvent<InventoryEvent>({
        type: "InventoryEvent",
        data: {
            quantity,
            sku
        },
    });
    console.log('new event with data', event.data)
    await client.appendToStream("inventory-stream", event);
}

export default write
