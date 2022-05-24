import React from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
`

const WordCount = () => {
    const [input, setInput] = React.useState<string>('')
    const [tokenCount, setTokenCount] = React.useState<number>(0)

    React.useEffect(() => {
        const tokens = input
            .split(' ')
            .filter((token) => token.length > 0)
        setTokenCount(tokens.length)
    }, [input])

    return <div>
        <p>Word Count: {tokenCount}</p>
        <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
    </div>
}

export default WordCount