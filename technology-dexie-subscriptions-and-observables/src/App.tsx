import { useLiveQuery } from "dexie-react-hooks"
import db, { MyTable } from "./db"

const App = () => {
  const liveData = useLiveQuery(async () => {
    return await db.myTable.toArray();
  });

  const addItem = async () => {
    await db.myTable.add({
      id: Date.now().toString(),
      index: Math.random(),
      message: 'Hello World!',
  })
  }

  return (
    <>
    <button onClick={addItem}>Add Item</button>
    <ul>
     {liveData?.map((data: MyTable) => (<li key={data.id}>{data.message}</li>))}
    </ul>
    </>
  )
}

export default App
