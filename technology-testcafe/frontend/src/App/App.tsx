import * as React from 'react'

import { Body, Title } from 'sharedComponents'

Title.displayName = "Page Title"

const App = () => {
  const [name, setName] = React.useState<string>('')
  const [input, setInput] = React.useState<string>('')

  const isValidInput = (string: string) => string.match(/^[A-Za-z]+$/) !== null

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if(isValidInput(input)){
      setName(input)
      setInput('')
    } else {
      alert('Invalid Input :(')
    }
  }

  return (
    <Body>
      <Title id="page-header">Hello {name || "World"}!</Title>
      <form>
        <input type="text" name="name" id="name" value={input} onChange={event => setInput(event.target.value)} />
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </Body>
  )
}

export default App
