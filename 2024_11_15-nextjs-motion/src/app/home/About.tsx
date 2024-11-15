import { motion, useMotionValue, useTransform } from 'motion/react'
import { useCallback } from 'react'
import { colors } from '../global'
import { Wrapper } from './sharedCSS'
const StyledMotionWrapper = motion(Wrapper)

const About = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  console.log('x', x)
  const color = useTransform(
    y,
    [0, window.innerHeight],
    [colors.blue200, colors.blue800]
  )
  const backgroundColor = useTransform(
    x,
    [0, window.innerWidth],
    [colors.blue800, colors.blue200]
  )

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      x.set(event.clientX)
      y.set(event.clientY)
    },
    [x, y]
  )

  return (
    <div onMouseMove={handleMouseMove}>
      <StyledMotionWrapper
        style={{
          backgroundColor,
          color
        }}
      >
        <h2>You&apos;re not a loser, you&apos;re just quirky. </h2>
      </StyledMotionWrapper>
    </div>
  )
}

export default About
