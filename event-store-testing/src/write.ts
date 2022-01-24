import { jsonEvent, JSONEventType } from '@eventstore/db-client';
import { client } from './client'

type InventoryEvent = JSONEventType<
    "InventoryEvent",
    {
        quantity: number
        sku: string
    }
>;

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
