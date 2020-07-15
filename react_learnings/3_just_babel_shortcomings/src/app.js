const SomeComponent = require('./SomeComponent')
import SomeOtherComponent from './SomeOtherComponent'

const App = () => {
    return <div><SomeComponent /><SomeOtherComponent /></div>
}

ReactDOM.render(<App />, document.getElementById('app'))