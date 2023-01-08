import { createRoot } from 'react-dom/client';
import styled from 'styled-components'

const Header = styled.h1`
    background-color: pink;
    color: #363636
`

const App = () => {
    return (
        <Header>Hello World.</Header>
    )
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);