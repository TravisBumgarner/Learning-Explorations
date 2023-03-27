import styled from 'styled-components'

import { Metadata } from 'sharedComponents'
import { useEffect, useMemo, useRef, useState } from 'react'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const BinWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: gray;
  margin: 10px;
`

const BananaWrapper = styled.div<{ disabled: boolean }>`
  width: 50px;
  height: 50px;
  filter: grayscale(${({ disabled }) => disabled ? 1 : 0});
  cursor: ${({ disabled }) => disabled ? ' not-allowed' : ' grab'};
  font-size: 40px;
`

type BinProps = {
  dragEnterCallback: (event: React.DragEvent<HTMLDivElement>, index: number) => void
  currentBinIndex: number
  matchedBinIndex: number
}
const Bin = ({ dragEnterCallback, currentBinIndex, matchedBinIndex }: BinProps) => {
  const [bananaCount, setBananaCount] = useState(0)

  useEffect(() => {
    if (matchedBinIndex === currentBinIndex) {
      setBananaCount(prev => prev += 1)
    }
  }, [matchedBinIndex])

  return (
    <BinWrapper onDragEnter={(event) => {
      dragEnterCallback(event, currentBinIndex)
    }}>{bananaCount} Bananas</BinWrapper>
  )
}

type BananaProps = {
  dropCallback: () => void
  dragStartCallback: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  bananaIndex: number
  matchedBananaIndex: number
}
const Banana = ({ dropCallback, dragStartCallback, bananaIndex, matchedBananaIndex }: BananaProps) => {
  const [hasBeenBinned, setHasBeenBinned] = useState(false)

  useEffect(() => {
    if (matchedBananaIndex === bananaIndex) {
      setHasBeenBinned(true)
    }
  }, [matchedBananaIndex])

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    dropCallback()
  }

  return (
    <BananaWrapper
      disabled={hasBeenBinned}
      onDragStart={(event) => dragStartCallback(event, bananaIndex)}
      draggable={!hasBeenBinned}
      onDragEnd={onDragEnd}
    >🍌</BananaWrapper>
  )
}

const Design4 = () => {
  // Dynamically generate the number of bananas and bins
  // Decreasing after matching bananas and bins has started might result in errors
  const [binCount, setBinCount] = useState(3)
  const [bananaCount, setBananaCount] = useState(3)

  // When a pairing is set for a bin and a banana, these both get set
  const [matchedBinIndex, setMatchedBinIndex] = useState(null)
  const [matchedBananaIndex, setMatchedBananaIndex] = useState(null)

  // Keep track of which banana is being dragged and which bin is being hovered
  const draggedBananaIndex = useRef<number>();
  const hoveredBinIndex = useRef<number>();


  const dragStartCallback = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    // Clear previous matching before starting
    setMatchedBinIndex(null)
    setMatchedBananaIndex(null)

    draggedBananaIndex.current = index;
  };

  const dragEnterCallback = (e: any, index: number) => {
    hoveredBinIndex.current = index;
  };

  const dropCallback = () => {
    setMatchedBinIndex(hoveredBinIndex.current)
    setMatchedBananaIndex(draggedBananaIndex.current)

    draggedBananaIndex.current = null;
    hoveredBinIndex.current = null;
  };

  const bins = useMemo(() => {
    const output = []
    for (let i = 0; i < binCount; i++) {
      output.push(<Bin
        matchedBinIndex={matchedBinIndex}
        dragEnterCallback={dragEnterCallback}
        key={i}
        currentBinIndex={i} />)
    }
    return output
  }, [binCount, matchedBinIndex, dragEnterCallback, dropCallback])

  const bananas = useMemo(() => {
    const output = []
    for (let i = 0; i < bananaCount; i++) {
      output.push(
        <Banana
          dropCallback={dropCallback}
          matchedBananaIndex={matchedBananaIndex}
          dragStartCallback={dragStartCallback}
          key={i}
          bananaIndex={i}
        />)
    }
    return output
  }, [bananaCount, matchedBananaIndex, dragStartCallback])


  return (
    <div>
      <Wrapper>
        {bins}
      </Wrapper>

      <Wrapper>
        {bananas}
      </Wrapper>

      <Metadata>
        <button onClick={() => setBananaCount(prev => prev - 1)}>-🍌</button>
        <button onClick={() => setBananaCount(prev => prev + 1)}>+🍌</button>
        <button onClick={() => setBinCount(prev => prev + 1)}>-🗑</button>
        <button onClick={() => setBinCount(prev => prev + 1)}>+🗑</button>
        Created 12/23/2022
      </Metadata>
    </div >
  )
}

export default Design4
