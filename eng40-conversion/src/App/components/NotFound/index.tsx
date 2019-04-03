import * as React from 'react'
import styled from 'styled-components'

import { Title, Text } from '../../../sharedComponents'

const NotFoundWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
`

export { NotFoundWrapper }

const NotFound = () => {
    return (
        <NotFoundWrapper>
            <Title size="medium">Whoops!</Title>
            <Text>Sorry, the page you were looking for was not found.</Text>
        </NotFoundWrapper>
    )
}

export default NotFound
