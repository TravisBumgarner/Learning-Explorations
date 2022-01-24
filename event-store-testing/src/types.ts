import { JSONEventType } from '@eventstore/db-client';

type InventoryEvent = JSONEventType<
    "InventoryEvent",
    {
        quantity: number
        sku: string
    }
>;

export {
    InventoryEvent
}