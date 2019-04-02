import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface HelloProps {
    compiler: string
    framework: string
}

const Hello = (props: HelloProps) => <div>Who knows</div>

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById('example')
)
