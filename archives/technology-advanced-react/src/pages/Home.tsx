import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components'

const Row = ({ index, style }: any) => (
    <div style={style}>Row {index}</div>
);

const Example = () => (
    <List
        height={150}
        itemCount={1000}
        itemSize={35}
        width={300}
    >
        {Row}
    </List>
);

const Home = () => {

    return (
        <div>
            <h1>Hello World!</h1>
            <Example />
        </div>
    )
}

export default Home
