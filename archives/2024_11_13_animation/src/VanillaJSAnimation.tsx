import { useCallback, useEffect, useRef } from "react";
import "./VanillaJSAnimation.css";

const VanillaJSAnimation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isAnimatingRef = useRef(false);

    const animate = useCallback(() => {
        if(isAnimatingRef.current) return;
        isAnimatingRef.current = true;

        if(containerRef.current?.classList.contains('fade-in')) {
            containerRef.current.classList.remove('fade-in');
            containerRef.current?.classList.add('fade-out');
        } else {
            containerRef.current!.classList.remove('fade-out');
            containerRef.current?.classList.add('fade-in');
        }
    }, []);

    useEffect(() => {
        if(!containerRef.current) return;

        containerRef.current?.addEventListener('animationend', () => {
            isAnimatingRef.current = false;
        });

        const container = containerRef.current;

        return () => {
            container.removeEventListener('animationend', () => {
                isAnimatingRef.current = false;
            });
        }
    }, []);

    return (
        <div ref={containerRef}>
            <button onClick={animate}>Animate</button>
            <h1>Vanilla JS Animation</h1>
        </div>
    )
}



export default VanillaJSAnimation;