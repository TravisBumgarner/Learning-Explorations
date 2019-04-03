import * as React from 'react'
import styled from 'styled-components'

import { Title, Text } from '../sharedComponents'

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
`

const Error = () => {
    return (
        <ErrorWrapper>
            <Title size="medium">Whoops!</Title>
            <Text>Sorry, there was an error, please try again later.</Text>
        </ErrorWrapper>
    )
}

export default Error
