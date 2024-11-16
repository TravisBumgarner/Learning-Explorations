import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { useEffect } from 'react'
import ThumbsUpIcon from 'remixicon-react/ThumbUpFillIcon'
import { Wrapper } from './sharedCSS'

const Hero = () => {
  const controls = useAnimation()
  const { scrollY } = useScroll()
  const color = useTransform(
    scrollY,
    [Math.max(0, window.innerHeight - 500), window.innerHeight],
    ['var(--blue800)', 'var(--blue100)']
  )

  useEffect(() => {
    color.on('change', latest => {
      controls.start({ color: latest })
    })
  }, [color, controls])

  return (
    <Wrapper $backgroundColor="var(--blue100)" $color="var(--blue800)">
      <div style={{ position: 'sticky', top: '20px' }}>
        <ThumbsUpIcon size={200} color="var(--blue800)" />
      </div>
      <motion.h1 animate={controls}>
        Buckle up, we are going for a ride!
      </motion.h1>
    </Wrapper>
  )
}

export default Hero
