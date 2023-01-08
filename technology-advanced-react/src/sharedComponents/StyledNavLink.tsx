import { NavLink } from 'react-router-dom'

import { colors } from 'theme'

type StyledNavLinkProps = {
    to: string
    text: string
    addWeightForActiveLink?: boolean
    color?: string
}

const StyledNavLink = ({ to, text, addWeightForActiveLink, color }: StyledNavLinkProps) => {
    return (
        <NavLink
            style={({ isActive }) => ({
                fontWeight: addWeightForActiveLink && isActive ? 700 : 100,
                color: color || colors.dark1.base,
            })}
            to={to}
        >
            {text}
        </NavLink>
    )
}

export default StyledNavLink
