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

const ChatBox = styled.input`
    width: 100%;
    box-sizing: border-box;
`

const ChatMessage = styled.div`
`

const ReceivedMessages = styled.div`
    width: 100%;
    flex-grow: 1;
    background-color: rgba(0,0,0,0.2);
`

const App = () => {
    React.useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        }

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log(dataFromServer)
        };


    }, [])

    return <Wrapper>
        <ReceivedMessages>
            <ChatMessage>ChatMessage</ChatMessage>
            <ChatMessage>ChatMessage</ChatMessage>
            <ChatMessage>ChatMessage</ChatMessage>
        </ReceivedMessages>
        <ChatBox />
    </Wrapper>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)