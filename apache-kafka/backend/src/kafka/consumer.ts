import dotenv from "dotenv"

dotenv.config()

import { Kafka } from 'kafkajs'

const clientId = process.env.CLIENT_ID || 'error'
const brokers = [process.env.BROKER || "error"]
const topic = process.env.TOPIC || "error"

const kafka = new Kafka({ clientId, brokers })

const consumer = kafka.consumer({ groupId: clientId })

const consume = async () => {
    // first, we wait for the client to connect and subscribe to the given topic
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log(`received message: ${message.value}`)
        },
    })
}

consume()