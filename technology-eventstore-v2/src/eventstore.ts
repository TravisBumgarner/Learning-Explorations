import { EventStoreDBClient, ResolvedEvent, SubscribeToAllOptions, SubscribeToStreamOptions } from '@eventstore/db-client'

export const client = new EventStoreDBClient({endpoint: 'localhost:2113'}, { insecure: true })


type AllStreamEventHandler = (e: ResolvedEvent) => void
const connectHandlerToAllStreamEvents = async (options: SubscribeToAllOptions, handler: AllStreamEventHandler) => {
    client.subscribeToAll(options).on('data', handler)
}

type StreamEventHandler = (e: ResolvedEvent) => void
const connectHandlerToStream = (stream: string, options: SubscribeToStreamOptions, handler: StreamEventHandler) => {
    client.subscribeToStream(stream, options).on('data', handler)
}

export default client
export {
    connectHandlerToAllStreamEvents,
    connectHandlerToStream
}