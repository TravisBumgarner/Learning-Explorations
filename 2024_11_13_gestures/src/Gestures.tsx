import { useCallback, useEffect, useRef, useState } from "react";

const X_THRESHOLD = 100;
const Y_THRESHOLD = 100;

const COMPASS = {
    '-1,-1': 'NW',
    '0,-1': 'N',
    '1,-1': 'NE',
    '-1,0': 'W',
    '1,0': 'E',
    '-1,1': 'SW',   
    '0,1': 'S',
    '1,1': 'SE' 
}

const Gestures = () => {
	const [direction, setDirection] = useState<string>("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const firstTouchRef = useRef<Touch | null>(null);
	const [fingersTouching, setFingersTouching] = useState<number>(0);
    const startRef = useRef<{ x: number, y: number } | null>(null);

    // it came from gpt
    const drawCompass = useCallback(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        const centerX = canvasRef.current!.width / 2;
        const centerY = canvasRef.current!.height / 2;
        const radius = 100;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY - radius);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius, centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX, centerY + radius);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX - radius, centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius, centerY - radius);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX - radius, centerY - radius);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + radius, centerY + radius);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX - radius, centerY + radius);
        ctx.stroke();

    }, [])

    useEffect(drawCompass, [drawCompass])

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDirection("");
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [direction]);

	const handleStart = useCallback((evt: TouchEvent) => {
		evt.preventDefault();
		const touches = evt.changedTouches;
		firstTouchRef.current = touches[0];

        startRef.current = {
            x: touches[0].pageX,
            y: touches[0].pageY
        }
		setFingersTouching(touches.length);
        setIsDragging(true);
	}, []);

	const handleEnd = useCallback((evt: TouchEvent) => {
		evt.preventDefault();
        setFingersTouching(evt.touches.length);

        const endX = evt.changedTouches[0].pageX;
        const endY = evt.changedTouches[0].pageY;

        const deltaX = endX - startRef.current!.x;
        const deltaY = endY - startRef.current!.y;

        const xDir = deltaX > X_THRESHOLD ? 1 : deltaX < -X_THRESHOLD ? -1 : 0;
        const yDir = deltaY > Y_THRESHOLD ? 1 : deltaY < -Y_THRESHOLD ? -1 : 0;
        setDirection(`${xDir},${yDir}`);

        setIsDragging(false);
	}, []);

	const handleMove = useCallback((evt: TouchEvent) => {
		// console.log(ongoingTouchesRef.current)
		// evt.preventDefault();
		// const touches = evt.changedTouches;
	}, []);

	useEffect(() => {
		canvasRef.current?.addEventListener("touchstart", handleStart);
		canvasRef.current?.addEventListener("touchend", handleEnd);

		return () => {
			canvasRef.current?.removeEventListener("touchstart", handleStart);
			canvasRef.current?.removeEventListener("touchend", handleEnd);
		};
	}, [handleStart, handleEnd, handleMove]);

	return (
		<div>
			<p>Direction: {COMPASS[direction as keyof typeof COMPASS]}</p>
            <p>Is Dragging? {isDragging ? "dragging" : "not dragging"}</p>
			<p>Presses: {fingersTouching}</p>
            <canvas style={{border: '2px solid red'}} ref={canvasRef} width={400} height={400}></canvas>
		</div>
	);
};

export default Gestures;
