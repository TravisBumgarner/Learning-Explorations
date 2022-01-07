import dotenv from "dotenv"

import db from '../db'
import { ButtonPress } from '../../../sharedTypes'

dotenv.config()

import { Kafka } from 'kafkajs'

const clientId = process.env.CLIENT_ID || 'error'
const brokers = [process.env.BROKER || "error"]
const topic = process.env.TOPIC || "error"

const kafka = new Kafka({ clientId, brokers })

const consumer = kafka.consumer({ groupId: clientId })

const consume = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log('message-received')
            if (message.value) {
                const parsedMessage: ButtonPress = JSON.parse(message.value.toString())
                console.log('isnerting', parsedMessage)
                await db.buttons.insert(parsedMessage)
                console.log('message-inserted')
            } else {
                throw new Error("invalid consumer value received")
            }

        },
    })
}

export default consume

if (require.main === module) {
    consume();
}