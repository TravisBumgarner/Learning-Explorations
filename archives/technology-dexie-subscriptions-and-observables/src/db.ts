import Dexie, { Table } from 'dexie';

export interface Parent {
	id: string;
	index: number;
	message: string;
}

export interface Child {
	id: string;
	index: number;
	message: string;
	parentId: string;
}

export class Database extends Dexie {
	parent!: Table<Parent>;
	child!: Table<Child>;

	constructor(name = 'IndexedDB') {
		super(name);
		this.version(2).stores({
			parent: '[id+index], index',
			child: '[id+index], parentId',
		});
	}
}

const db = new Database();

export default db;
