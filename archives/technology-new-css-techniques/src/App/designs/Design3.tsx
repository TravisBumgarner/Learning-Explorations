import styled from 'styled-components'

import { Metadata } from 'sharedComponents'
import { useEffect, useMemo, useState } from 'react'

const ANIMATION_DURATION = 1 // seconds

const CenterThings = styled.div`
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BananasWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.5rem;
  border-radius: 1rem;
  background: radial-gradient(circle at bottom right, rgb(255,224,75),rgb(232,206,175));
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  border: 2px solid white;
`

const H1 = styled.h1<{ delay: number }>`
  animation-delay: ${({ delay }) => ANIMATION_DURATION * delay}s;
  font-size: 0px;
  animation-name: header;
  animation-duration: ${ANIMATION_DURATION}s;
  animation-iteration-count: once;
  animation-timing-function: cubic-bezier(.81,.55,.46,1.01);
  animation-fill-mode: forwards;
  @keyframes header {
      0% {
        font-size:0px;
      }
      100% {
        font-size:2rem;
      }
  }
`

const BananaWrapper = styled.div<{ delay: number, isGray: boolean }>`
    display:inline-block;
    filter: grayscale(${({ isGray }) => isGray ? 1 : 0});
    animation-name: rotate;
    cursor: grab;
    animation-delay: ${({ delay }) => ANIMATION_DURATION * delay}s;
    animation-duration: ${ANIMATION_DURATION}s;
    animation-iteration-count: once;
    animation-timing-function: cubic-bezier(.81,.55,.46,1.01);
    animation-fill-mode: forwards;
    font-size: 0;

    @keyframes rotate {
      0% {
        font-size:0px;
        transform: rotate(30deg);

      }
      50% {
        font-size:100px;
      }
      100% {
        font-size:100px;
        transform: rotate(390deg);
      }
  }
`

const Banana = ({ delay }: { delay: number }) => {
  const [isGray, setIsGray] = useState(false)

  return (
    <BananaWrapper onClick={() => setIsGray(true)} isGray={isGray} delay={delay}>
      <p>🍌</p>
    </BananaWrapper>
  )
}

const Design3 = () => {
  const [count, setCount] = useState(3)

  const Bananas = useMemo(() => {
    const items = []
    // key={`${count}${i}`} is a bit hacky to force a refresh
    // https://stackoverflow.com/questions/35792275/how-to-force-remounting-on-react-components
    for (let i = 0; i < count; i++) items.push(<Banana key={`${count}${i}`} delay={i} />)
    return <BananasWrapper>{items}</BananasWrapper>
  }, [count])

  return (
    <CenterThings>
      <H1 delay={count}>{count} Votes for you!</H1>
      {Bananas}
      <Metadata>
        <button onClick={() => setCount(prev => prev - 1)}>-🍌</button>
        <button onClick={() => setCount(prev => prev + 1)}>+🍌</button>
        Created 12/23/2022
      </Metadata>
    </CenterThings >
  )
}

export default Design3
