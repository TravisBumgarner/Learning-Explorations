import { useCallback, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import designs from './designs'

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
`

const Navigation = () => {
    return (
        <Wrapper>
            <Link to="/sandbox">Sandbox</Link>
            <Link to="/1">1</Link>
            {Object.keys(designs).map(key => <Link key={key} to={`/${key.toLowerCase()}`}>{key}</Link>)}
        </Wrapper>
    )
}

export default Navigation