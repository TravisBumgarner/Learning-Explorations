import * as React from 'react'
import styled from 'styled-components'

import { PRIMARY_COLOR, TERTIARY_COLOR } from '../theme'

const ExternalLinkWrapper = styled.a`
    color: ${PRIMARY_COLOR};
    text-decoration: none;
    &:hover {
        color: ${TERTIARY_COLOR};
        cursor: pointer;
    }
    font-size: 1.5rem;
    font-weight: 700;
    font-family: Raleway, sans-serif;
`

const ExternalLink = ({ children, primary, href, onClick }) => {
    return (
        <ExternalLinkWrapper target="_blank" primary={primary} href={href} onClick={onClick}>
            {children}
        </ExternalLinkWrapper>
    )
}

export default ExternalLink
