import { createConnection, getRepository } from 'typeorm'
import { SubscribeToAllOptions} from "@eventstore/db-client"

import { connectHandlerToStreamEvents } from './eventstore'
import ormconfig from './db/ormconfig'
import entity from './db'
import { ReadPosition } from '@eventstore/db-client'

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

const eventHandler = async () => {
    const postgresConnection = await createConnection(ormconfig)

    const result = await postgresConnection
        .getRepository(entity.ProjectionOffset)
        .createQueryBuilder('ProjectionOffset')
        .select('MAX(commit_position)', 'commitPosition')
        .getRawOne<{commitPosition: bigint}>()


    const options: SubscribeToAllOptions = result && result.commitPosition
        ? {
            fromPosition: {
                commit: result.commitPosition,
                prepare: result.commitPosition
            }
        }
        : {
            fromPosition: 'start'
        }
console.log(options)

connectHandlerToStreamEvents(options, event => {
    if (event.commitPosition) {
        const projectionRepository = getRepository(entity.ProjectionOffset)

        const projectionOffset = new entity.ProjectionOffset
        projectionOffset.commit_position = event.commitPosition
        projectionRepository.save(projectionOffset)
    } else {
        console.log('Event does not have commitPosition')
    }

})
}
eventHandler()
