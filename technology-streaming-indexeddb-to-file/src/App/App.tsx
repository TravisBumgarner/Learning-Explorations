import React from 'react'
import { db } from '../db'
import { useLiveQuery } from 'dexie-react-hooks'

function AddFriendForm() {
  const [index, setIndex] = React.useState(0);
  const [blobStr, setBlobStr] = React.useState('');
  const [id, setId] = React.useState(Math.random());

  async function addEntry() {
    await db.entries.add({
      id,
      blob: new Blob([blobStr]),
      index
    });

    setIndex(prev => prev + 1)
    setBlobStr('')

  }

  return <>
    <p>
      {index}
    </p>
    BlobStr:
    <input
      type="text"
      value={blobStr}
      onChange={ev => setBlobStr(ev.target.value)}
    />
    <button onClick={addEntry}>
      Add
    </button>
  </>
}

function EntriesList() {
  const entries = useLiveQuery(
    () => db.entries.toArray()
  );

  return <ul>
    {entries?.map(entry => <li key={`${entry.id}_${entry.index}`}>
      {entry.id}, {entry.index}, Size: {entry.blob.size}
    </li>)}
  </ul>;
}

const App = () => (<div>
  <AddFriendForm />
  <EntriesList />
</div>)

export default App
