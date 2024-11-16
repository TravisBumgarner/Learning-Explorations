import { useRef } from 'react'
import styled from 'styled-components'
import Hello from './1_Hello'
import RoundWeGo from './2_RoundWeGo'
import GettingSpringy from './3_GettingSpringy'

const Home = () => {
  const pagesWrapperRef = useRef<HTMLDivElement>(null)

  const scrollNextPage = () => {
    if (pagesWrapperRef.current) {
      pagesWrapperRef.current.scrollTo({
        top: pagesWrapperRef.current.scrollTop + window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div
        ref={pagesWrapperRef}
        style={{ overflowY: 'scroll', height: '100vh' }}
      >
        <Hello />
        <RoundWeGo />
        <GettingSpringy />
      </div>
      <div style={{ position: 'fixed', right: 30, bottom: 30 }}>
        <Button onClick={scrollNextPage}>Next</Button>
      </div>
    </>
  )
}

const Button = styled.button`
  border: 2px solid var(--blue500);
  background-color: var(--blue200);
  padding: 10px 20px;
  border-radius: 5px;
  color: var(--blue500);
  &:hover {
    background-color: var(--blue300);
  }

  &:active {
    background-color: var(--blue400);
  }
`

export default Home
