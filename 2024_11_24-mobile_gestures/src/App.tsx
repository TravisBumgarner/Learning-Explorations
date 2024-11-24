import styled from 'styled-components';
import ColorCirclePicker from './ColorCirclePicker';

import './App.css';

function App() {
  return (
    <AppContainer>
      <ColorCirclePicker />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100%;
`

export default App;
