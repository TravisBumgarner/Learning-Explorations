import { useCallback, useEffect, useMemo, useRef } from "react"
import { db, Entry } from "./db"

const App = () => {
  const counter = useRef(0)
  const handleSubmit = useCallback(async () => {
    const entry: Entry = {
      id: Math.random(),
      counter: counter.current,
      data: 'some data',
      status: 'unuploaded'
    }
    await db.entries.add(entry)
    counter.current++
    console.log('added')
  }, [])

  const counterWorker: Worker = useMemo(
    () => new Worker(new URL("./background/counter.ts", import.meta.url)),
    []
  );

  useEffect(() => {
    if (window.Worker) {
      counterWorker.postMessage('init');
      return () => counterWorker.postMessage('cleanup');
    }
  }, [counterWorker]);

  return (
    <div>
      <button onClick={handleSubmit}>Add some db data</button>
    </div>
  )
}

export default App
