import { motion, useMotionValue, useSpring } from 'motion/react'
import { useCallback, useRef } from 'react'
import { Wrapper } from './sharedCSS'

const About = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const motionRef = useRef<HTMLHeadingElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const left = useSpring(x, { stiffness: 100, damping: 10 })
  const top = useSpring(y, { stiffness: 100, damping: 10 })

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (wrapperRef.current && motionRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect()
        x.set(event.clientX - rect.left - motionRef.current.offsetWidth / 2)
        y.set(event.clientY - rect.top - motionRef.current.offsetHeight / 2)
      }
    },
    [x, y]
  )

  return (
    <Wrapper
      onMouseMove={handleMouseMove}
      $backgroundColor="var(--blue200)"
      $color="var(--blue700)"
      style={{ position: 'relative' }}
      ref={wrapperRef}
    >
      <motion.div ref={motionRef} style={{ left, top, position: 'absolute' }}>
        <h2>Spring About</h2>
        <p>(Move the mouse)</p>
      </motion.div>
    </Wrapper>
  )
}

export default About
