import styled from 'styled-components'

const Title = styled.h1`
    color: black;
    font-size: 48px;
`

const Body = styled.div`
    background-color: white;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: center;
`

const Metadata = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 1rem;
    background-color: white;
    border: 2px solid black;
    border-radius: 1rem;
    font-size: 1rem;
`

export {
    Title,
    Body,
    Metadata
}
