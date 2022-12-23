import { useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
`

const Navigation = () => {
    return (
        <Wrapper>
            <Link to="/sandbox">Sandbox</Link>
            <Link to="/designs">Designs</Link>
        </Wrapper>
    )
}

export default Navigation