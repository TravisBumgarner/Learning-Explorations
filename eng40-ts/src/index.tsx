import * as React from 'react'
import styled from 'styled-components'

import { Header, Navigation, Sidebar, TodoList } from './components'

const SomeStyledThing = styled(({ className, children }) => {
    // This is coooool.
    return <div className={className}>{children}</div>
})`
    border: 5px solid red;
`

interface AppProps {}

interface ContentWrapperProps {
    children: any
}

const ContentWrapper = ({ children }: ContentWrapperProps) => {
    const wrapperStyle = { display: 'flex', flexDirectionProperty: 'row' }
    return <div style={wrapperStyle}>{children}</div>
}

const App = (props: AppProps) => (
    <div>
        <Header />
        <SomeStyledThing>BREAK THE RULES</SomeStyledThing>
        <Navigation />
        <ContentWrapper>
            <Sidebar />
            <TodoList />
        </ContentWrapper>
    </div>
)

export default App
