import { HelloWorld } from './Components'

const App = () => {
    return (
        <div>
            <HelloWorld />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
