import * as React from 'react'

interface ButtonProps {
    text: string
    onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
    return <button onClick={onClick}>{text}</button>
}

export default Button
