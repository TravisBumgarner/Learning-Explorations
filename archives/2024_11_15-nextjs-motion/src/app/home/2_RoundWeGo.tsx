'use client'

import { motion, useMotionValue, useTransform } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../global'
import { Wrapper } from './sharedCSS'
const StyledMotionWrapper = motion(Wrapper)

const RotatingCircle = styled(motion.svg)`
  width: 100px;
  height: 100px;
`

const About = () => {
  const [isClient, setIsClient] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const color = useTransform(
    y,
    [0, window.innerHeight],
    [colors.blue200, colors.blue700]
  )
  const backgroundColor = useTransform(
    x,
    [0, window.innerWidth],
    [colors.blue950, colors.blue50]
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      x.set(event.clientX)
      y.set(event.clientY)
    },
    [x, y]
  )

  if (!isClient) {
    return null
  }

  return (
    <div onMouseMove={handleMouseMove}>
      <StyledMotionWrapper
        style={{
          backgroundColor,
          color
        }}
      >
        <h2>Round and round we go!</h2>
        <p>(move the mouse)</p>
        <RotatingCircle
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: colors.blue200, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: colors.blue800, stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#grad1)" />
          <circle cx="50" cy="50" r="35" fill="var(--blue100)" />
        </RotatingCircle>
      </StyledMotionWrapper>
    </div>
  )
}

export default About
