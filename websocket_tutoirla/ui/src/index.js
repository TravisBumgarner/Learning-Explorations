import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

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