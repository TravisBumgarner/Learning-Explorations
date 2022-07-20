import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

import { Body, Title } from 'sharedComponents'

const App = () => {
  const [items, setItems] = React.useState<{_id: string, text: string}[]>([])
  const [text, setText] = React.useState<string>('')

  React.useEffect(() => {
    axios.get('http://localhost:5001/all')
      .then(response => setItems(response.data))
  }, [])

  const handleDelete = (_id: string) => {
    axios.post('http://localhost:5001/delete', {_id})
    .then((result: any) => {
      if(result.data.acknowledged){
        setItems(() => {
          const modifiedItems = [...items]
          return items.filter((item) => item._id !== _id)
        })
      } else {
        alert('something went wrong')
      }
    })
    setText('')
  }

  const handleAdd = () => {
    axios.post('http://localhost:5001/add', {text})
    .then(({insertedId}: any) => {
      setItems(prev => ([...prev, {text, _id: insertedId}]))
    })
    setText('')
  }

  return (
    <Body>
      <Title>Hello World!</Title>
      <ul>
        {items.map(({_id, text}) => {
          return <li>{text}<button onClick={() => handleDelete(_id)}>X</button></li>
        })}
      </ul>
      <div>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
        <button onClick={handleAdd}>Add Item</button> 
      </div>
    </Body>
  )
}

export default App
