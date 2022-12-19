import Dexie, { Table } from 'dexie'

import { TImage } from 'sharedTypes'

class MySubClassedDexie extends Dexie {
    videos!: Table<TImage>

    constructor() {
        super('todo-today')
        this.version(1).stores({
            videos: '[id]',
        })
    }
}

const db = new MySubClassedDexie()

export default db