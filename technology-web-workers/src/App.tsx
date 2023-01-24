import { useCallback, useRef } from "react"
import { db } from "./db"

const App = () => {
  const counter = useRef(0)
  const handleSubmit = useCallback(async () => {
    await db.entries.add({
      id: Math.random(),
      counter: counter.current,
      data: 'some data'
    })
    counter.current++
    console.log('added')
  }, [])

  return (
    <div>
      <button onClick={handleSubmit}>Add some db data</button>
    </div>
  )
}

export default App
