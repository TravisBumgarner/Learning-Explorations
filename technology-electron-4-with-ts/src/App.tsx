import { createRoot } from 'react-dom/client';
import { useCallback, useState } from 'react';
import styled from 'styled-components'

const Header = styled.h1`
    background-color: pink;
    color: #363636
`

const App = () => {
    const [result, setResult] = useState('')
    const handleClick = useCallback(() => {
        window.foobar.ping().then(r => setResult(prev => prev + r))
    }, [])

    return (
        <>
            <Header>Hello World.</Header>
            <p>{window.foobar.chrome()}</p>
            <p>{window.foobar.electron()}</p>
            <p>{window.foobar.node()}</p>
            <button onClick={handleClick}>Click Me!</button>
            <p>Result: {result}</p>
        </>
    )
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);