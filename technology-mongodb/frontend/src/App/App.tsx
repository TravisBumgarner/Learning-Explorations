import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Body, Title } from 'sharedComponents'

const App = () => {

  const [items, setItems] = React.useState<{id: string, text: string}[]>([{id: 'foo', text: 'foo'}])
  const [newItem, setNewItem] = React.useState<string>('')

  const handleDelete = (id: string) => {
    console.log(id)
  }
  const handleAdd = () => {
    // ID needs to come back from Mongo
    setItems(prev => ([...prev, {text: newItem, id: uuidv4()}]))
    setNewItem('')
  }

  return (
    <Body>
      <Title>Hello World!</Title>
      <ul>
        {items.map(({id, text}) => {
          return <li>{text}<button onClick={() => handleDelete(id)}>X</button></li>
        })}
      </ul>
      <div>
        <input type="text" value={newItem} onChange={(event) => setNewItem(event.target.value)}/>
        <button onClick={handleAdd}>Add Item</button> 
      </div>
    </Body>
  )
}

export default App
