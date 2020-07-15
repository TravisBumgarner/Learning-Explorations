const SomeComponent = require('./SomeComponent');

import SomeOtherComponent from './SomeOtherComponent';

const App = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SomeComponent, null), /*#__PURE__*/React.createElement(SomeOtherComponent, null));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));