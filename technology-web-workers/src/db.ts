// db.ts
import Dexie, { Table } from 'dexie';

export interface Entry {
    id: number;
    counter: number;
    data: string;
}

export class MySubClassedDexie extends Dexie {
    entries: Table<Entry>;

    constructor() {
        super('myDatabase');
        this.version(1).stores({
            entries: 'id, counter'
        });
    }
}

export const db = new MySubClassedDexie(); ``