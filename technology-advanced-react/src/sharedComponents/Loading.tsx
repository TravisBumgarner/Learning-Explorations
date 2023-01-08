import styled from 'styled-components'
import { useEffect, useState } from 'react'

const LoadingWrapper = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LoadingText = styled.p`
    width: 200px;
    font-size: 2rem;
`

const FULL_MESSAGE = '🍌🍌🍌🍌🍌'

const Loading = () => {
    const [displayLength, setDisplayLength] = useState<number>(FULL_MESSAGE.length)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayLength((prev) => (prev === FULL_MESSAGE.length ? 0 : prev + 2))
        }, 125)

        return () => clearInterval(intervalId)
    }, [displayLength])

    return (
        <LoadingWrapper>
            <LoadingText>{FULL_MESSAGE.slice(0, displayLength)}</LoadingText>
        </LoadingWrapper>
    )
}

export default Loading
