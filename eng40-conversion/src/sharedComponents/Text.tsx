import * as React from 'react'
import styled from 'styled-components'

const DefaultTextWrapper = styled.p`
    margin: 5px 0;
    font-family: Montserrat, sans-serif;
    line-height: 1.5;
    font-weight: 100;
    font-size: 1.2rem;
`

const SmallTextWrapper = styled.p`
    margin: 5px 0;
    font-family: Montserrat, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-size: 1rem;
`

const LargeTextWrapper = styled.p`
    margin: 5px 0;
    font-family: Montserrat, sans-serif;
    line-height: 1.5;
    font-weight: 100;
    font-size: 1.2rem;
`

const Text = ({ children, size }) => {
    let TextWrapper

    if (size === 'small') {
        TextWrapper = SmallTextWrapper
    } else if (size === 'large') {
        TextWrapper = LargeTextWrapper
    } else {
        TextWrapper = LargeTextWrapper
    }

    return <TextWrapper>{children}</TextWrapper>
}

export default Text
