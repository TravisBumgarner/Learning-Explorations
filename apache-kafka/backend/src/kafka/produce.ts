import dotenv from "dotenv"

dotenv.config()

// import the `Kafka` instance from the kafkajs library
import { Kafka } from 'kafkajs'

// the client ID lets kafka know who's producing the messages
const clientId = process.env.CLIENT_ID
// we can define the list of brokers in the cluster
const brokers = [process.env.BROKER || "error"]
// this is the topic to which we want to write messages
const topic = process.env.TOPIC || "error"


// initialize a new kafka client and initialize a producer from it
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

// we define an async function that writes a new message each second
const produce = async (message: string) => {
    await producer.connect()
    let i = 0
    try {
        await producer.send({
            topic,
            messages: [
                {
                    key: String(i),
                    value: message,
                },
            ],
        })

    } catch (err) {
        console.error("could not write message " + err)
    }
}

export default produce