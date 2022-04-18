import { NavLink } from 'react-router-dom'
import React from 'react'

import colors from './colors'

const StyledNavLink = ({ to, text }: { to: string, text: string }) => (
    <NavLink
        style={({ isActive }) => ({
            fontWeight: isActive ? 700 : 100,
            color: colors.TERTIARY.darken,
        })}
        to={to}
    >
        {text}
    </NavLink>
)

export default StyledNavLink