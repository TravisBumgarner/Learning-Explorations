import Dexie, { Table } from 'dexie'

import { TImage } from 'sharedTypes'

class MySubClassedDexie extends Dexie {
    images!: Table<TImage>

    constructor() {
        super('todo-today')
        this.version(1).stores({
            images: '[id]',
        })
    }
}

const db = new MySubClassedDexie()

export default db