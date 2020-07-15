const Components = require('./Components')

ReactDOM.render(
    React.createElement('div', null, [
        React.createElement(Components.HelloWorld),
    ]),
    document.getElementById('app')
)
