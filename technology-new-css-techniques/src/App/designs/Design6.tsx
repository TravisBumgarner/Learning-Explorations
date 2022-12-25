import styled from 'styled-components'

import { Metadata } from 'sharedComponents'
import { useEffect, useMemo, useRef, useState } from 'react'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  `

const List = styled.ul`
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
  align-items: center;
  `

const ListItem = styled.li`
  background-color: #ffaa00;
  padding: 1rem;
  animation-name: grow;
  border-bottom: 3px solid #ffaa00;

  &:hover {
    transition: border-bottom 2s;
    /* padding: 2rem 1rem; */
    border-bottom: 3px solid red;
  }

  ::before {
    content: 'aa';
  }
`

const Design5 = () => {
  const onClick = () => console.log('clicked')

  return (
    <Wrapper>
      <List>
        <ListItem>Item A</ListItem>
        <ListItem>Item B</ListItem>
        <ListItem>Item C</ListItem>
        <ListItem>Item D</ListItem>
      </List>
    </Wrapper>
  )
}

export default Design5
