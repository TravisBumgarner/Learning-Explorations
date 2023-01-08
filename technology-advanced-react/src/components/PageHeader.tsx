import { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Heading } from 'sharedComponents'
import { colors } from 'theme'
import { context } from 'context'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Header = () => {
    return (
        <Wrapper>
            <h1>
                App
            </h1>
        </Wrapper >
    )
}

export default Header