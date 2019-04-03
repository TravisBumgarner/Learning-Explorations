import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { PRIMARY_COLOR, TERTIARY_COLOR, media } from '../../../theme'
import { Title } from '../../../sharedComponents'
import { Navigation } from './components'

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${PRIMARY_COLOR};

    &:hover {
        color: ${TERTIARY_COLOR};
    }
`

const HeaderWrapper = styled.div`
    justify-content: center;
    justify-content: space-between;
    display: flex;
    margin-bottom: 40px;

    ${media.desktop`
        margin: 20px 4vw;
    `}

    ${media.tablet`
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
    `}
`

const Header = () => {
    return (
        <HeaderWrapper>
            <StyledLink to="/">
                <Title size="large">Travis Bumgarner</Title>
            </StyledLink>
            <Navigation />
        </HeaderWrapper>
    )
}

export default Header
