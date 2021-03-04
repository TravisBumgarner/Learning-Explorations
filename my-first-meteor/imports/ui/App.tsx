import React from 'react';
import styled from 'styled-components';

type TileProps = {
  text: string
  className: string
}

const PageWrapper = styled.div`
  margin: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`


const PageTitle = styled.h1`
  height: 10vh;
  font-size: 3rem;
`

const TileTable = styled.div`
  display: flex;
  flex-direction: column;
  height: min(80vw, 80vh);
  width: min(80vw, 80vh);
`

const TileRow = styled.div`
  display: flex;
  flex-direction: row;
`



const Tile = styled(({ text, className }: TileProps) => (
  <div className={className} >
    <button onClick={() => {console.log(`Moving ${text}.`)}}>
      {text}
    </button>
  </div>

))`
  background-color: gray;
  height:auto;
  flex: 1 0 auto;
  margin: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content:'';
    float:left;
    padding-top:100%;
  }
`

export const App = () => (
  <PageWrapper>
    <PageTitle>Photoxploration!</PageTitle>
    <TileTable>
      <TileRow>
        <Tile text="NW" />
        <Tile text="N" />
        <Tile text="NE" />
      </TileRow>
      <TileRow>
        <Tile text="W" />
        <Tile text="C" />
        <Tile text="E" />
      </TileRow>
      <TileRow>
        <Tile text="SW" />
        <Tile text="S" />
        <Tile text="SE" />
      </TileRow>
    </TileTable>
  </PageWrapper>
);
