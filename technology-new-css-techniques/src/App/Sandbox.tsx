import * as React from 'react'
import styled from 'styled-components'

const Translate = styled.div`
  width: 100px;
  height: 100px;
  background-color: turquoise;
  transform: translate(-100px, -100px);
  transition-duration: 2s;

  &:hover {
    transform: translate(100px, 100px);
    transition-duration: 2s;
    transition-timing-function: steps(4, jump-end);
  }
`

const Button = styled.button`
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid transparent;
  color: blue;

  &:hover {
    transition-duration: 0.5s;
    background: blue;
    color: white;
    border: 2px solid white;
  }
`

const Keyframes = styled.div`
  width: 100px;
  height: 100px;
  background-color: green;
  animation-name: skew_animation;
  animation-duration: 2s;
  animation-iteration-count: infinite;

  @keyframes skew_animation {
    0% {
      transform: skew(0deg);
    }
    25% {
      transform: skew(30deg);
    }
    50% {
      transform: skew(0deg);
    }
    75% {
      transform: skew(-30deg);
    }
    100% {
      transform: skew(0deg);
    }
  }
`

const Sandbox = () => {
  return (
    <div>
      <Translate>Translate</Translate>
      <Button>Click Me</Button>
      <Keyframes />
    </div>
  )
}

export default Sandbox
