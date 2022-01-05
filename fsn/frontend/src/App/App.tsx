import { useMachine } from '@xstate/react'
import { createMachine, actions, EventObject } from 'xstate'
import styled from 'styled-components'
import * as React from 'react'

import { Body, Title, Text } from 'sharedComponents'

type EventId = "COUNT" | "STOP" | "RESET"

interface CounterContext {
  counter: number;
}

interface CounterEvent extends EventObject {
  type: EventId;
}

const countEffect = actions.assign<CounterContext, CounterEvent>(
  context => {
    return {
      counter: context.counter + 1
    }
  }
);

const resetEffect = actions.assign<CounterContext, CounterEvent>(
  context => {
    return {
      counter: 0
    }
  }
);

const counterMachine = createMachine({
  id: 'counter',
  initial: 'stop',
  context: {
    counter: 0,
  },
  states: {
    stop: {
      on: { COUNT: 'count' }
    },
    count: {
      onEntry: ["countEffect"],
      on: { COUNT: 'stop' },
      after: {
        500: [
          {
            target: "count",
            cond: context => context.counter < 100
          }
        ]
      }
    }
  },

},
  {
    actions: {
      countEffect,
      resetEffect
    }
  });

const Button = styled.button`
  border-radius: 0;
  border: lightpink inset 5px;
  color: lightpink;
  background-color: lightslategray;
  padding: 5px;
  margin: 5px;
  width: 150px;
`

let intervalID: null | NodeJS.Timeout
const App = () => {
  const [state, send] = useMachine(counterMachine);

  console.log('state', state)

  return (
    <Body>
      <Title>Tape Player!</Title>
      <div>
        <Button onClick={() => send('COUNT')}>
          Toggle Counter
        </Button>
        <Button onClick={() => send('RESET')}>
          Reset Counter
        </Button>
      </div>
      <div>
        <Text>Current Time: {state.context.counter}</Text>
        <Text>Current State: {state.value}</Text>
      </div>
    </Body>
  )
}

export default App
