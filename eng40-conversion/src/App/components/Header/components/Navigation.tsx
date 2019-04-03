import * as React from 'react'
import styled from 'styled-components'

import { media } from '../../../../theme'
import { ExternalLink } from '../../../../sharedComponents'

const List = styled.div`
    display: flex;
    align-items: center;
`

const Item = styled.div`
    margin-left: 10px;

    ${media.tablet`
    margin: 0 10px;
    `}
`

const NavigationWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
`

const EXTERNAL_LINKS = [
    {
        href: 'https://blog.travisbumgarner.com',
        content: 'Blog'
    },
    {
        href: 'https://travisbumgarner.photography',
        content: 'Photography'
    },
    {
        href: 'https://twitter.com/travis_the_makr',
        content: 'hi'
    },
    {
        href: 'https://instagram.com/travis_the_maker',
        content: 'foo'
    },
    {
        href: 'https://www.linkedin.com/in/travisbumgarner/',
        content: 'bar'
    }
]

const Navigation = () => {
    const ExternalLinks = EXTERNAL_LINKS.map(l => (
        <Item key={l.href}>
            <ExternalLink href={l.href}>{l.content}</ExternalLink>
        </Item>
    ))

    return (
        <NavigationWrapper>
            <List>{ExternalLinks}</List>
        </NavigationWrapper>
    )
}

export default Navigation
