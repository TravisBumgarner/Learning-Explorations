import styled, { css } from 'styled-components'

import { Metadata } from 'sharedComponents'
import { ReactChild, useEffect, useMemo, useRef, useState } from 'react'

const PhotoWrapper = styled.div<{ top: number, left: number, rotation: number }>`
  border: 2px solid black;
  width: 150px;
  box-sizing: border-box;
  position: absolute;
  transition: all 0.5s;

  ${({ top, left, rotation }) => css`
  left: ${top}px;
  top: ${left}px;
  transform: rotate(${rotation}deg);
  `}

  &:hover {
    left: calc(50vw - 75px);
    top: calc(50vh - 100px);
    transform: rotate(0);
    transform: scale(4);
  }

  > div:first-child {
    background-color: white;
    height: 150px;
    padding: 10px;
  }

  > div:last-child {
    background-color: black;
    color: white;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`


const Photo = ({ content }: { content: any }) => {
  const [left, setLeft] = useState(Math.round(Math.random() * 1000))
  const [top, setTop] = useState(Math.round(Math.random() * 1000))
  const [rotation, setRotation] = useState(Math.round(Math.random() * 360))

  const handleClick = () => {
    setLeft(500)
    setTop(500)
    setRotation(0)
  }

  return (
    <PhotoWrapper top={top} left={left} rotation={rotation}>
      <div>
        A picture would go here.
      </div>
      <div>
        <p>Label Here</p>
      </div>
    </PhotoWrapper>
  )
}

const Design8 = () => {

  return (
    <div>
      <div>
        <Photo content={"hello"} />
        <Photo content={"hello"} />
        <Photo content={"hello"} />
        <Photo content={"hello"} />
        <Photo content={"hello"} />
        <Photo content={"hello"} />
      </div>
      <Metadata>
        Polaroids.
      </Metadata>
    </div>
  )
}

export default Design8
