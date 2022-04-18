import React from 'react'
import styled from 'styled-components'

import { StyledNavLink } from 'sharedComponents'

const HeaderWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    & > div:first-child, & > div:nth-child(2) {
        display: flex;
        align-items: center;
    }
    width: 100%;
    border: 1px solid black;
`

const StyledNav = styled.ul`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;

    li {
        margin: 0 1rem;
    }
`


const Navigation = () => {
    const links = [
        { text: 'Home', to: '/' },
        { text: 'Word Count', to: '/wordcount' },
    ]

    return (
        <div style={{ position: 'relative' }}>
            <StyledNav>
                {links.map(({ text, to }) => (
                    <li key={to} >
                        <StyledNavLink to={to} text={text} />
                    </li>
                ))}
            </StyledNav>
        </div>
    )
}

const Header = () => {
    return (
        <HeaderWrapper>
            <Navigation />
        </HeaderWrapper>
    )
}

export default Header