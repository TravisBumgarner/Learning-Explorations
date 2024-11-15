import React from 'react';
import './App.css';
import VanillaCSSAnimation from './VanillaCSSAnimation'
import styled from 'styled-components';
import VanillaJSAnimation from './VanillaJSAnimation';
import MotionLib from './MotionLib';
import MotionLibScrollingPOC from './MotionLibScrollingPOC';

enum Page {
  RefreshToggle,
  VanillaCSSAnimation,
  VanillaJSAnimation,
  MotionLib,
  MotionLibScrollingPOC,
}

function App() {
  const [page, setPage] = React.useState<Page>(Page.MotionLibScrollingPOC);

  const setPageAndRemount = (page: Page) => {
    setPage(Page.RefreshToggle);
    setTimeout(() => {
      setPage(page);
    }, 0);
  }

  return (
    <>
        <button onClick={() => setPageAndRemount(Page.VanillaCSSAnimation)}>CSS Van</button>
        <button onClick={() => setPageAndRemount(Page.VanillaJSAnimation)}>JS Van</button>
        <button onClick={() => setPageAndRemount(Page.MotionLib)}>Motion Library</button>
        <button onClick={() => setPageAndRemount(Page.MotionLibScrollingPOC)}>Motion Library Scrolling POC</button>
        <Container>
          {page === Page.VanillaCSSAnimation && <VanillaCSSAnimation />}
          {page === Page.VanillaJSAnimation && <VanillaJSAnimation />}
          {page === Page.MotionLib && <MotionLib />}
          {page === Page.MotionLibScrollingPOC && <MotionLibScrollingPOC />}
          {page === Page.RefreshToggle && <div>Refresh</div>}
        </Container>
    </>
  );
}

const Container = styled.div`
`

export default App;
