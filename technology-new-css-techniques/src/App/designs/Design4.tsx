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

const Bin = ({ dragEnter, drop, index, indexWhenDropped }: any) => {
  const [bananaCount, setBananaCount] = useState(0)
  const onDragEnter = (e: any) => {
    dragEnter(e, index)
    console.log("ondragenter called", index)
  }

  useEffect(() => {
    if (indexWhenDropped === index) {
      setBananaCount(prev => prev += 1)
    }
  }, [indexWhenDropped])

  return (
    <BinWrapper onDragEnter={onDragEnter}>{bananaCount} Bananas</BinWrapper>
  )
}

const Banana = ({ drop, dragStart, dragEnter, index, dragItemIndexDropped }: any) => {
  const [hasBeenDropped, setHasBeenDropped] = useState(false)

  useEffect(() => {
    if (dragItemIndexDropped === index) {
      setHasBeenDropped(true)
    }
  }, [dragItemIndexDropped])

  const onDragEnd = (e: any) => {
    console.log('on drag end')
    drop()
  }

  return (
    <BananaWrapper
      disabled={hasBeenDropped}
      onDragStart={(e: any) => dragStart(e, index)}
      draggable={!hasBeenDropped}
      onDragEnter={(e) => dragEnter(e, index)}
      onDragEnd={onDragEnd}
    >🍌</BananaWrapper>
  )
}

const Design4 = () => {
  const [count, setCount] = useState(3)
  const [dragOverItemIndexDropped, setDragOverItemIndexDropped] = useState(null)
  const [dragItemIndexDropped, setDragItemIndexDropped] = useState(null)

  const dragItem = useRef<HTMLElement>();
  const dragOverItem = useRef<HTMLElement>();

  const dragStart = (e: any, position: any) => {
    setDragOverItemIndexDropped(null)
    setDragItemIndexDropped(null)
    dragItem.current = position;
    console.log('dragStart', e.target.innerHTML);
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
    console.log('dragEnter', e.target.innerHTML);
  };

  const drop = (e: any) => {
    setDragOverItemIndexDropped(dragOverItem.current)
    setDragItemIndexDropped(dragItem.current)
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div>
      <Wrapper>
        <Bin drop={drop} indexWhenDropped={dragOverItemIndexDropped} dragEnter={dragEnter} index={0} />
        <Bin drop={drop} indexWhenDropped={dragOverItemIndexDropped} dragEnter={dragEnter} index={1} />
        <Bin drop={drop} indexWhenDropped={dragOverItemIndexDropped} dragEnter={dragEnter} index={2} />
      </Wrapper>

      <Wrapper>
        <Banana drop={drop} dragItemIndexDropped={dragItemIndexDropped} dragEnter={dragEnter} dragStart={dragStart} index={0} />
        <Banana drop={drop} dragItemIndexDropped={dragItemIndexDropped} dragEnter={dragEnter} dragStart={dragStart} index={1} />
      </Wrapper>

      <Metadata>
        Created 12/23/2022
      </Metadata>
    </div >
  )
}

export default Design4
