import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { w3cwebsocket as W3CWebSocket } from "websocket"

const client = new W3CWebSocket('ws://127.0.0.1:5000');


const Wrapper = styled.div`
    margin: 20vh 20vw;
    width: 60vw;
    height: 60vw;
    display: flex;
    flex-direction: column;
`

const ChatBoxWrapper = styled.div`
    display: flex;
`

const ChatBox = styled.input`
    box-sizing: border-box;
    flex-grow: 1;
`

const ChatboxSubmit = styled.button``

const ChatMessage = styled.div`
`

const ReceivedMessages = styled.div`
    width: 100%;
    flex-grow: 1;
    background-color: rgba(0,0,0,0.2);
`

const App = () => {
    const [messagesReceived, setMessagesReceived] = React.useState([])
    const [user, setUser] = React.useState('')
    const [hasUserPickedName, setHasUserPickedName] = React.useState(false)

    client.onopen = () => {
        console.log('WebSocket Client Connected');
    }

    client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        console.log(messagesReceived)
        setMessagesReceived([...messagesReceived, dataFromServer])
    };

    const [messageToSend, setMessageToSend] = React.useState('')

    const login = () => {
        setHasUserPickedName(true)
    }

    const submit = () => {
        client.send(JSON.stringify({
            "content": messageToSend,
            "sender": user
        }))
        setMessageToSend('')
    }
    const chatMessages = messagesReceived.map(({ content, sender }) => {
        return <ChatMessage><strong>{sender}</strong>: {content}</ChatMessage>
    })

    const ChatApp = <>
        <ReceivedMessages>
            {chatMessages}
        </ReceivedMessages>
        <ChatBoxWrapper>
            <ChatBox value={messageToSend} onChange={(event) => setMessageToSend(event.target.value)} />
            <ChatboxSubmit onClick={submit}>Send</ChatboxSubmit>
        </ChatBoxWrapper>
    </>


    const ChatLogin = <div>
        <p>What's your name?</p>
        <input onChange={(event) => setUser(event.target.value)} />
        <button onClick={login}>Login!</button>
    </div >


    return <Wrapper>{hasUserPickedName ? ChatApp : ChatLogin}</Wrapper>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)