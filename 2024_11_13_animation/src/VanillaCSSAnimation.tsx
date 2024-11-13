import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

const VanillaCSSAnimation = () => {
    const [animationCounter, setAnimationCounter] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
 
    useEffect(() => {
        if(!containerRef.current) return

        const handleAnimationIteration = (event: any) => {
            console.log("i'm called", event)
            setAnimationCounter(prev => prev + 1)
        }
        containerRef.current.addEventListener('animationiteration', handleAnimationIteration)
        
        const container = containerRef.current
        return () => {
            container.removeEventListener('animationiteration', handleAnimationIteration)
        }
    }, [])


    return (
        <div>
            <Container ref={containerRef}>Bouncing Link {animationCounter}</Container>
        </div>
    )

}

const Container = styled.div`
    color: green;

    @keyframes color {
        25%,
        75% {
            color: blue;
        }

        50% {
            color: magenta;
        }
    }

    @keyframes vibrate {
        0% {
            transform: translate(0);
        }

        20% {
            transform: translate(-2px, 2px);
        }

        40% {
            transform: translate(-2px, -2px);
        }

        60% {
            transform: translate(2px, 2px);
        }

        80% {
            transform: translate(2px, -2px);
        }

        100% {
            transform: translate(0);
        }
    }

    animation: color 2s infinite;

    &:hover {
        animation: vibrate 0.3 infinite;
    }
`

export default VanillaCSSAnimation