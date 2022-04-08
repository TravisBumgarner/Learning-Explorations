import React from 'react';
import { Text, useInput } from 'ink';

type UserInputProps = {
    label: string,
    handleSubmit: (label: string) => void
}

const UserInput = ({ label, handleSubmit }: UserInputProps) => {
    const [input, setInput] = React.useState<string>('')

    useInput((allKeys, specialKey) => {
        if (specialKey.return) {
            handleSubmit(input)
        } else if (specialKey.backspace || specialKey.delete) {
            setInput(input.slice(0, input.length - 1))
        } else if (allKeys) {
            setInput(input + allKeys)
        }
    });

    return <Text>{label}: {input}</Text>
}

export default UserInput