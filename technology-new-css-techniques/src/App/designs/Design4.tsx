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
  dropCallback: () => void
  currentBinIndex: number
  binIndexWhereBananaDropped: number
}
const Bin = ({ dragEnterCallback, dropCallback, currentBinIndex, binIndexWhereBananaDropped }: BinProps) => {
  const [bananaCount, setBananaCount] = useState(0)

  useEffect(() => {
    if (binIndexWhereBananaDropped === currentBinIndex) {
      setBananaCount(prev => prev += 1)
    }
  }, [binIndexWhereBananaDropped])

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
  selectedBananaIndex: number
}
const Banana = ({ dropCallback, dragStartCallback, bananaIndex, selectedBananaIndex }: BananaProps) => {
  const [hasBeenDropped, setHasBeenDropped] = useState(false)

  useEffect(() => {
    if (selectedBananaIndex === bananaIndex) {
      setHasBeenDropped(true)
    }
  }, [selectedBananaIndex])

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    dropCallback()
  }

  return (
    <BananaWrapper
      disabled={hasBeenDropped}
      onDragStart={(event) => dragStartCallback(event, bananaIndex)}
      draggable={!hasBeenDropped}
      onDragEnd={onDragEnd}
    >🍌</BananaWrapper>
  )
}

const Design4 = () => {
  const [binCount, setBinCount] = useState(3)
  const [bananaCount, setBananaCount] = useState(3)

  const [selectedBinIndex, setSelectedBinIndex] = useState(null)
  const [selectedBananaIndex, setSelectedBananaIndex] = useState(null)

  const activeBananaIndex = useRef<number>();
  const activeBinIndex = useRef<number>();

  const resetActiveItems = () => {
    setSelectedBinIndex(null)
    setSelectedBananaIndex(null)
  }

  const dragStartCallback = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    resetActiveItems()
    activeBananaIndex.current = index;
  };

  const dragEnterCallback = (e: any, index: number) => {
    activeBinIndex.current = index;
  };

  const dropCallback = () => {
    setSelectedBinIndex(activeBinIndex.current)
    setSelectedBananaIndex(activeBananaIndex.current)

    activeBananaIndex.current = null;
    activeBinIndex.current = null;
  };

  const bins = useMemo(() => {
    const output = []
    for (let i = 0; i < binCount; i++) {
      output.push(<Bin
        dropCallback={dropCallback}
        binIndexWhereBananaDropped={selectedBinIndex}
        dragEnterCallback={dragEnterCallback}
        key={i}
        currentBinIndex={i} />)
    }
    return output
  }, [binCount, selectedBinIndex, dragEnterCallback, dropCallback])

  const bananas = useMemo(() => {
    const output = []
    for (let i = 0; i < bananaCount; i++) {
      output.push(
        <Banana
          dropCallback={dropCallback}
          selectedBananaIndex={selectedBananaIndex}
          dragStartCallback={dragStartCallback}
          key={i}
          bananaIndex={i}
        />)
    }
    return output
  }, [bananaCount, selectedBananaIndex, dragEnterCallback, dragStartCallback])


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
