import * as React from 'react'

import { LargeTitle, MediumTitle, SmallTitle } from './Title.styles'

const Title = ({ children, size }) => {
    switch (size) {
        case 'large':
            return <LargeTitle size={size}>{children}</LargeTitle>
        case 'small':
            return <SmallTitle size={size}>{children}</SmallTitle>
        case 'medium':
        default:
            return <MediumTitle size={size}>{children}</MediumTitle>
    }
}

export default Title
