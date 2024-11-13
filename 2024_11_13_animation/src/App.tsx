import React from 'react';
import './App.css';
import VanillaCSSAnimation from './VanillaCSSAnimation'
import styled from 'styled-components';
import VanillaJSAnimation from './VanillaJSAnimation';

enum Page {
  VanillaCSSAnimation,
  VanillaJSAnimation
}

function App() {
  const [page, setPage] = React.useState<Page>(Page.VanillaCSSAnimation);


  return (
    <div>
        <button onClick={() => setPage(Page.VanillaCSSAnimation)}>Vanilla CSS</button>
        <button onClick={() => setPage(Page.VanillaJSAnimation)}>Vanilla JS</button>
        <Container>
          {page === Page.VanillaCSSAnimation && <VanillaCSSAnimation />}
          {page === Page.VanillaJSAnimation && <VanillaJSAnimation />}
        </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c34;
  color: white;
`

export default App;
