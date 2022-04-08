import React from 'react';
import { Text } from 'ink';

const Loading = () => {
    const [dots, setDots] = React.useState<number>(0)
    const [color, setColor] = React.useState<string>('green')

    React.useEffect(() => {
        if (dots < 5) {
            setColor('green')
        } else if (dots >= 5 && dots < 10) {
            setColor('yellow')
        } else {
            setColor('red')
        }

    }, [dots])

    React.useEffect(() => {
        const intervalId = setInterval(() => setDots(prev => prev + 1), 50)
        return () => clearInterval(intervalId)
    }, [])

    return <Text color={color}>Fetching weather, please hold{'.'.repeat(dots)}</Text>
}

export default Loading