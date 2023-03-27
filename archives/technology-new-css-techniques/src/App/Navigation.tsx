import { useCallback, useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import designs from './designs'

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    
    > a {
        padding: 0px 5px;
    }
`
const Navigation = () => {
    return (
        <Wrapper>
            <Link to="/sandbox">Sandbox</Link>
            {Object.keys(designs).map(key => <Link key={key} to={`/${key.toLowerCase()}`}>{key}</Link>)}
        </Wrapper>
    )
}

export default Navigation