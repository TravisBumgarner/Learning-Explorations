import "reflect-metadata";
import { createConnection, QueryBuilder } from "typeorm";
import { Inventory } from "./entity/Inventory";

const eventStream = [
    { sku: 'foo123', quantity: 10 },
    { sku: 'foo123', quantity: 20 },
    { sku: 'bar456', quantity: 40 },
    { sku: 'foo123', quantity: 50 },
    { sku: 'foo123', quantity: 10 },
    { sku: 'foo123', quantity: 10 },
    { sku: 'bar456', quantity: 100 },
    { sku: 'foo123', quantity: 200 },
]

createConnection().then(async connection => {
    await eventStream.forEach(async event => {
        // // Overwrite Events
        console.log('handling', event)
        // await connection
        //     .createQueryBuilder()
        //     .insert()
        //     .into(Inventory)
        //     .values(event)
        //     .orUpdate({ conflict_target: ['sku'], overwrite: ['quantity'] })
        //     .execute()

        // Insert or update on failure
        try {
            console.log('trying event', event)
            await connection
                .createQueryBuilder()
                .insert()
                .into(Inventory)
                .values(event)
                .execute()
            console.log('success')
        } catch (e) {
            console.log('updating')
            await connection
                .createQueryBuilder()
                .update(Inventory)
                .set({ quantity: () => `quantity + ${event.quantity}` })
                .execute()
        }
    })
    // connection.close()
}).catch(error => console.log(error));
