import { connectHandlerToStreamEvents } from './eventstore'
import { createConnection, getRepository } from 'typeorm'

import ormconfig from './db/ormconfig'
import entity from './db'

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

const eventHandler = async () => {
    await createConnection(ormconfig)
    connectHandlerToStreamEvents(e => {
        if (e.commitPosition) {
            const projectionRepository = getRepository(entity.ProjectionOffset)

            const projectionOffset = new entity.ProjectionOffset
            // Because :shrug: https://stackoverflow.com/questions/59927625/how-to-store-big-int-in-nest-js-using-typeorm
            projectionOffset.commitPosition = e.commitPosition
            projectionRepository.save(projectionOffset)
        } else {
            console.log('Event does not have commitPosition')
        }

    })
}
eventHandler()
