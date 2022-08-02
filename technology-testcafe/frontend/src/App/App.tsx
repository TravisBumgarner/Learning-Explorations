import * as React from 'react'

import { Body, Title } from 'sharedComponents'

Title.displayName = "Page Title"

const WithDisplayName = () => {
  const [toggle, setToggle] = React.useState<boolean>(false)
  return <div>
    <p>With Display Name</p>
    <button onClick={() => setToggle(!toggle)}>{toggle ? "On" : "Off"}</button>
  </div>
}
WithDisplayName.displayName = "WithDisplayName"

const WithoutDisplayName = () => {
  const [toggle, setToggle] = React.useState<boolean>(false)
  console.log("without display name")
  return <div>
    <p>Without Display Name</p>
    <button onClick={() => setToggle(!toggle)}>{toggle ? "On" : "Off"}</button>
  </div>
}

const Depth2 = () => {
  return <div>
    <h3>Depth2</h3>
  </div>
}
Depth2.displayName = "Depth2"

const Depth1 = () => {
  return <div>
    <h2>Depth1</h2>
    <Depth2 />
    </div>
}
Depth1.displayName = "Depth1"

const Depth0 = () => {
  return <div>
    <h1>Depth0</h1>
    <Depth1 />
    </div>
}
Depth0.displayName = "Depth0"

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
      <WithDisplayName />
      <WithoutDisplayName />
      <Depth0 />
      <form>
        <input type="text" name="name" id="name" value={input} onChange={event => setInput(event.target.value)} />
        <button id="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </Body>
  )
}

export default App
