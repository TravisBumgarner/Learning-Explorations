import styled from 'styled-components'

import { colors } from 'theme'

const H1 = styled.h1`
    font-size: 3rem;
    color: ${colors.light1.base};
    margin: 1rem 0;
    text-align: center;
    width: 100%;
`

const H2 = styled.h2`
    color: ${colors.light1.base};
    margin: 0.5rem 0;
    text-align: center;
`

const H3 = styled.h3`
    color: ${colors.light1.base};
    margin: 0.25rem 0;
    text-align: center;
`

const H4 = styled.h4`
    color: ${colors.light1.base};
    text-align: center;
`

export { H1, H2, H3, H4 }
