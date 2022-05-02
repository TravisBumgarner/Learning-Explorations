import { createConnection, getRepository } from 'typeorm'
import { SubscribeToAllOptions, SubscribeToStreamOptions } from "@eventstore/db-client"

import {
    connectHandlerToStream,
    connectHandlerToAllStreamEvents
} from './eventstore'
import ormconfig from './db/ormconfig'
import entity from './db'

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

const allStreamsHandler = async () => {
    const postgresConnection = await createConnection(ormconfig)

    const result = await postgresConnection
        .getRepository(entity.ProjectionOffset)
        .createQueryBuilder('projection_offset')
        .select("MAX(projection_offset.offset)", 'offset')
        .groupBy('stream')
        .andWhere('projection_offset.stream = :stream', {stream: 'all'})
        .getRawOne<{ offset: bigint }>()

    const options: SubscribeToAllOptions = result && result.offset
        ? {
            fromPosition: {
                commit: result.offset,
                prepare: result.offset
            }
        }
        : {
            fromPosition: 'start'
        }

    console.log(`Starting stream all at with options ${JSON.stringify(options)}`)

    connectHandlerToAllStreamEvents(options, event => {
        if (event.commitPosition) {
            const projectionRepository = getRepository(entity.ProjectionOffset)

            const projectionOffset = new entity.ProjectionOffset
            projectionOffset.offset = event.commitPosition
            projectionOffset.stream = "all"
            projectionRepository.save(projectionOffset)
        } else {
            console.log(`Event does not have offset for stream all`)
        }
    })
}
allStreamsHandler()

const streamHandler = async (stream: string) => {
    const postgresConnection = await createConnection(ormconfig)

    const result = await postgresConnection
        .getRepository(entity.ProjectionOffset)
        .createQueryBuilder('projection_offset')
        .select("MAX(projection_offset.offset)", 'offset')
        .groupBy('stream')
        .andWhere('projection_offset.stream = :stream', { stream })
        .getRawOne<{ offset: bigint }>()
    
    const options: SubscribeToStreamOptions = result && result.offset
        ? { fromRevision: result.offset }
        : { fromRevision: 'start' }

    console.log(`Starting stream ${stream} at with options ${JSON.stringify(options)}`)

    connectHandlerToStream(stream, options, event => {
        // Could also be event.link
        if(event.event){
            const projectionRepository = getRepository(entity.ProjectionOffset)
            const projectionOffset = new entity.ProjectionOffset
            projectionOffset.offset = event.event.revision
            projectionOffset.stream = stream
            projectionRepository.save(projectionOffset)
        }
    })
}
streamHandler('my-demo-stream')