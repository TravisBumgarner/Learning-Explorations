import { EventStoreDBClient, ResolvedEvent } from '@eventstore/db-client'

export const client = new EventStoreDBClient({endpoint: 'localhost:2113'}, { insecure: true })

type eventHandler = (e: ResolvedEvent) => void

export const connectHandlerToStreamEvents = async (handler: eventHandler): Promise<void> => {
    client.subscribeToAll({ fromPosition: 'start' }).on('data', handler)
}

export default client
