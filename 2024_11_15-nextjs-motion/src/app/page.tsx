'use client'

import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      Hello world.
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: var(--font-comfortaa);
`;