import React from 'react'
import {db} from '../db'
import {useLiveQuery} from 'dexie-react-hooks'

function AddFriendForm() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(5);
  const [status, setStatus] = React.useState("");

  async function addFriend() {
    try {

      // Add the new friend!
      const id = await db.friends.add({
        name,
        age
      });

      setStatus(`Friend ${name} successfully added. Got id ${id}`);
      setName("");
      setAge(5);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return <>
    <p>
      {status}
    </p>
    Name:
    <input
      type="text"
      value={name}
      onChange={ev => setName(ev.target.value)}
    />
    Age:
    <input
      type="number"
      value={age}
      onChange={ev => setAge(Number(ev.target.value))}
    />
    
    <button onClick={addFriend}>
      Add
    </button>
  </>
}

function FriendList() {
  const friends = useLiveQuery(
    () => db.friends.toArray()
  );

  return <ul>
    {friends?.map(friend => <li key={friend.id}>
      {friend.name}, {friend.age}
    </li>)}
  </ul>;
}

const App = () => (<div>
  <AddFriendForm />
  <FriendList />
</div>)

export default App
