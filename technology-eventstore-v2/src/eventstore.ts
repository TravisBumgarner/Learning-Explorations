import { EventStoreDBClient, ResolvedEvent, SubscribeToAllOptions } from '@eventstore/db-client'

export const client = new EventStoreDBClient({endpoint: 'localhost:2113'}, { insecure: true })

type eventHandler = (e: ResolvedEvent) => void

export const connectHandlerToStreamEvents = async (options: SubscribeToAllOptions, handler: eventHandler): Promise<void> => {
    client.subscribeToAll(options).on('data', handler)
}

export default client
