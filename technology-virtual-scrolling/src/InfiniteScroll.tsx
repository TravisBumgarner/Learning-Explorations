import {useEffect, useState} from 'react';
import './App.css';
import UiVirtualScroll from './UiVirtualScroll';

const limit = 100
// the number of items that we want to keep in memory - 300
const buffer = limit * 3
// the number of items that we want to cache when new chunk of data is loaded 
const cache = buffer - limit

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const callApi = (offset: number, limit: number) => {
    return new Promise((resolve) => {
      const items = [] as any
      for (let index = offset; index < offset + limit; index++) {
        items.push('label ' + index)
      }
  
      setTimeout(() => {
        resolve(items)
      }, 2000)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    callApi(0, buffer).then((res: any) => {
      setItems(res)
      setIsLoading(false)
    })
  }, [])

  const prevCallback = (newOffset: number) => {
    setIsLoading(true)

    return callApi(newOffset, limit).then((res: any) => {
      const newItems = [...res, ...items.slice(0, cache)] as any
      setItems(newItems)
      setIsLoading(false)
      return true
    })
  }

  const nextCallback = (newOffset: number) => {
    setIsLoading(true)

    return callApi(newOffset, limit).then((res: any) => {
      const newItems = [...items.slice(-cache), ...res] as any
      setItems(newItems)
      setIsLoading(false)
      return true
    })
  }

  return (
    <div className="App">
      <UiVirtualScroll
        buffer={buffer}
        rowHeight={39}
        height="50vh"
        limit={limit}
        onPrevCallback={prevCallback}
        onNextCallback={nextCallback}
      >
        <>
          {items.map((item: any, index: number) => (
            <div style={{ padding: '10px' }}>
              {isLoading ? <>Loading...</> : item}
            </div>
          ))}
        </>
      </UiVirtualScroll>
    </div>
  )
}

export default App;
