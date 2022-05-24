import styled from 'styled-components'

import colors from './colors'

type ButtonProps = {
    variation: 'primary' | 'secondary' | 'tertiary' | 'alert' | 'disabled'
    disabled?: boolean
    fullWidth?: boolean

}

const Button = styled.button`
    font-family: 'Comfortaa', cursive;
    font-size: 1rem;
    border: 2px solid;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    margin: 0.5rem;
    &:hover {
    cursor: pointer;
    }
    ${({ fullWidth }: ButtonProps) => (fullWidth ? 'width: 100%;' : '')}
    ${({ variation, disabled }: ButtonProps) => {
        if (disabled) {
            return `
                color: ${colors.DISABLED.base};
                border-color: ${colors.DISABLED.base};
                &:hover {
                    background-color: ${colors.DISABLED.lighten};
                    color: ${colors.DISABLED.darken};
                    border-color: ${colors.DISABLED.darken};
                    cursor: not-allowed;
                }
            `
        }
        if (variation === 'primary') {
            return `
                color: ${colors.PRIMARY.base};
                border-color: ${colors.PRIMARY.base};
                &:hover {
                    color: ${colors.PRIMARY.darken};
                    border-color: ${colors.PRIMARY.darken};
                    background-color: ${colors.PRIMARY.lighten};
                }
            `
        } if (variation === 'secondary') {
            return `
                color: ${colors.SECONDARY.base};
                border-color: ${colors.SECONDARY.base};
                &:hover {
                    background-color: ${colors.SECONDARY.lighten};
                    color: ${colors.SECONDARY.darken};
                    border-color: ${colors.SECONDARY.darken};
                }
            `
        } if (variation === 'tertiary') {
            return `
                color: ${colors.TERTIARY.base};
                border-color: ${colors.TERTIARY.base};
                &:hover {
                    background-color: ${colors.TERTIARY.lighten};
                    color: ${colors.TERTIARY.darken};
                    border-color: ${colors.TERTIARY.darken};
                }
            `
        } if (variation === 'alert') {
            return `
                color: ${colors.ALERT.base};
                border-color: ${colors.ALERT.base};
                &:hover {
                    background-color: ${colors.ALERT.lighten};
                    color: ${colors.ALERT.darken};
                    border-color: ${colors.ALERT.darken};
                }
            `
        }
    }}
`

export default Button