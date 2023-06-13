import Dexie, { Table } from 'dexie';

export interface MyTable {
	id: string;
	index: number;
	message: string;
}

export class Database extends Dexie {
	myTable!: Table<MyTable>;

	constructor(name = 'IndexedDB') {
		super(name);
		this.version(1).stores({
			myTable: '[id+index]',
		});
	}
}

const db = new Database();

export default db;
