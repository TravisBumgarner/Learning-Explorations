// db.ts
import Dexie, { Table } from 'dexie';

export interface Entry {
  id?: number;
  index: number;
  blob: Blob;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  entries!: Table<Entry>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      entries: '[id+index]' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();