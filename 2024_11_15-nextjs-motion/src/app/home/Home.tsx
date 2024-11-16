'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../global'
import Hello from './1_Hello'
import RoundWeGo from './2_RoundWeGo'
import GettingSpringy from './3_GettingSpringy'

const Home = () => {
  const pagesWrapperRef = useRef<HTMLDivElement>(null)
  const [buttonHover, setButtonHover] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollNextPage = () => {
    if (pagesWrapperRef.current) {
      pagesWrapperRef.current.scrollTo({
        top: pagesWrapperRef.current.scrollTop + window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  if (!isClient) {
    return null
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
        <MotionButton
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          animate={{
            backgroundColor: buttonHover ? colors.blue500 : colors.blue100,
            color: buttonHover ? colors.blue100 : colors.blue500
          }}
          onClick={scrollNextPage}
        >
          Next
        </MotionButton>
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
`

const MotionButton = motion(Button)

export default Home
