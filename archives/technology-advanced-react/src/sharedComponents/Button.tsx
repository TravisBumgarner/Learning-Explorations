import styled from 'styled-components'

import { colors } from 'theme'
import Icon, { IconProps } from './Icon'

type ButtonProps = {
    label?: string
    icon?: IconProps['name']
    variation: 'dark1' | 'light1' | 'disabledlight' | 'warninglight'
    disabled?: boolean
    fullWidth?: boolean
    onClick?: () => void
    type: 'submit' | 'button'
}

const StyledButton = styled.button`
    font-size: 1rem;
    border: 4px solid;
    padding: 0.5rem 1rem;
    background-color: transparent;
    font-weight: 700;
    border-radius: 1rem;
    margin: 1rem 0;
    justify-content: center; 
    display: flex;

    align-items: center;

    &:hover {
    cursor: pointer;
    }

    .label, .material-symbols-outlined {
        margin: 0px 6px;
    }

    ${({ fullWidth }: ButtonProps) => (fullWidth
        ? `
            width: 100%; 
        `
        : '')}

    ${({ variation, disabled }: ButtonProps) => {
        if (disabled) {
            return `
                color: ${colors.disabledlight.base};
                border-color: ${colors.disabledlight.base};

                &:hover {
                    cursor: not-allowed;
                }
            `
        }

        if (variation === 'dark1') {
            return `
                color: ${colors.dark1.base};
                border-color: ${colors.dark1.base};

                &:hover {
                    color: ${colors.dark1.darken};
                    border-color: ${colors.dark1.darken};
                    background-color: ${colors.dark1.lightest};
                }
            `
        } if (variation === 'light1') {
            return `
                color: ${colors.light1.base};
                border-color: ${colors.light1.base};

                &:hover {
                    background-color: ${colors.light1.lighten};
                    color: ${colors.light1.darken};
                    border-color: ${colors.light1.darken};
                }
            `
        }
    }}
`

const Button = ({ label, icon, variation, fullWidth, disabled, onClick, type }: ButtonProps) => {
    return (
        <StyledButton type={type} onClick={onClick} icon={icon} variation={variation} disabled={disabled} fullWidth={fullWidth}>
            {label && <span className="label">{label}</span>}
            {icon && <Icon name={icon} color={disabled ? colors.dark1.base : colors[variation].base} />}
        </StyledButton>
    )
}

export default Button
