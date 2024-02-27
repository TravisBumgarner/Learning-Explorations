import { useLiveQuery } from 'dexie-react-hooks';
import db, { Parent, Child } from './db';

const App = () => {
	const liveParent = useLiveQuery(async () => {
		return await db.parent.toArray();
	});

	const liveChild = useLiveQuery(async () => {
		return await db.child.toArray();
	});

	const addParentItem = async () => {
		await db.parent.add({
			id: Date.now().toString(),
			index: Math.random(),
			message: 'Hello World!',
		});
	};

	const addChildItem = async () => {
		const parent = await db.parent.get({ index: 0 });
		if (parent) {
			await db.child.add({
				id: Date.now().toString(),
				index: Math.random(),
				message: 'Hello World!',
				parentId: parent.id,
			});
		} else {
			console.log('No parent found');
		}
	};

	return (
		<>
			<button onClick={addChildItem}>Add Child Item</button>
			<button onClick={addParentItem}>Add Parent Item</button>
			<h6>Parent</h6>
			<ul>
				{liveParent?.map((data: Parent) => (
					<li key={data.id}>{data.message}</li>
				))}
			</ul>
			<h6>Child</h6>
			<ul>
				{liveChild?.map((data: Child) => (
					<li key={data.id}>{data.message}</li>
				))}
			</ul>
		</>
	);
};

export default App;
