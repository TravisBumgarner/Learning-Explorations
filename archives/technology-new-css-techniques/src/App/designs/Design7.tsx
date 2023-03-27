import styled from 'styled-components'

import { Metadata } from 'sharedComponents'
import { useEffect, useMemo, useRef, useState } from 'react'

const ListItem = styled.li<{ order: number }>`
  order: ${({ order }) => order};
  transform: all 5s;
`

const List = styled.ul`
  display: flex;
`

const randomChoice = () => {
  const items = ['a', 'b', 'c'] as const
  return items[Math.floor(Math.random() * items.length)];
}

const Design7 = () => {
  const [votes, setVotes] = useState({ a: 0, b: 0, c: 0 })

  useEffect(() => {

    setInterval(() => {
      setVotes(prev => {
        const update = { ...prev }
        update[randomChoice()] += 1
        return update
      })
    }, 1000)
  }, [])

  const ListItems = useMemo(() => {
    return Object
      .keys(votes)
      .sort((a: keyof typeof votes, b: keyof typeof votes) => votes[a] - votes[b])
      .map((key: keyof typeof votes, order: number) => <ListItem order={order} key={key}>{key} - {votes[key]}</ListItem>)
  }, [votes])

  return (
    <div>
      <div>
        <List>
          {ListItems}
        </List>
      </div>
      <Metadata>
        Dramatic votes caster
        Cannott actually use order for css. Booo.
      </Metadata>
    </div>
  )
}

export default Design7
