import * as React from 'react'

import { Header, Navigation, Sidebar, TodoList } from './components'

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
        <Navigation />
        <ContentWrapper>
            <Sidebar />
            <TodoList />
        </ContentWrapper>
    </div>
)

export default App
