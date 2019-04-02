import * as React from 'react'

import { Header, Navigation } from './components'

interface AppProps {}

const App = (props: AppProps) => (
    <div>
        <Header />
        <Navigation />
    </div>
)

export default App
