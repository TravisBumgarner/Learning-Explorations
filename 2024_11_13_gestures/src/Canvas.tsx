import { useCallback, useEffect, useRef } from "react";
import { styled } from "styled-components";

function copyTouch({
	identifier,
	pageX,
	pageY,
}: {
	identifier: number;
	pageX: number;
	pageY: number;
}) {
	return { identifier, pageX, pageY };
}

function colorForTouch(touch: Touch) {
    const { pageX, pageY } = touch;
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;

    const r = Math.floor((pageX / maxX) * 255);
    const g = Math.floor((pageY / maxY) * 255);
    const b = Math.floor(((pageX + pageY) / (maxX + maxY)) * 255);

    const color = `rgb(${r},${g},${b})`;
    console.log(`color for touch with identifier ${touch.identifier} = ${color}`);
    return color;
}

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const ongoingTouchesRef = useRef<any[]>([]);

    function ongoingTouchIndexById(idToFind: number) {
		for (let i = 0; i < ongoingTouchesRef.current.length; i++) {
			const id = ongoingTouchesRef.current[i].identifier;

			if (id === idToFind) {
				return i;
			}
		}
		return -1; // not found
	}

	const handleStart = useCallback((evt: TouchEvent) => {
		evt.preventDefault();
		// console.log("touchstart.");
		const ctx = canvasRef.current?.getContext("2d");
		const touches = evt.changedTouches;
        // console.log('touches', touches)
		if (!ctx) return;

		for (let i = 0; i < touches.length; i++) {
			console.log(`touchstart: ${i}.`);
			ongoingTouchesRef.current.push(copyTouch(touches[i]));
		}
	}, []);

	const handleEnd = useCallback((evt: TouchEvent) => {
        evt.preventDefault();
        // console.log("touchend");
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return

        const touches = evt.changedTouches;
      
        for (let i = 0; i < touches.length; i++) {
        //   const color = colorForTouch(touches[i]);
          let idx = ongoingTouchIndexById(touches[i].identifier);
      
          if (idx >= 0) {
            ongoingTouchesRef.current.splice(idx, 1); // remove it; we're done
          } else {
            console.log("can't figure out which touch to end");
          }
        }
	}, [])

	const handleCancel = useCallback((e: TouchEvent) => {
        e.preventDefault();
        // console.log("touchcancel.");
        const touches = e.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            ongoingTouchesRef.current.splice(i, 1); // remove it; we're done
        }
	}, [])

	const handleMove = useCallback((evt: TouchEvent) => {
        console.log(ongoingTouchesRef.current)

		evt.preventDefault();
		const ctx = canvasRef.current?.getContext("2d");
		const touches = evt.changedTouches;

		if (!ctx) return;

		for (let i = 0; i < touches.length; i++) {
			const color = colorForTouch(touches[i]);
			const idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
				ctx.beginPath();
				ctx.moveTo(
					ongoingTouchesRef.current[idx].pageX,
					ongoingTouchesRef.current[idx].pageY
				);
				ctx.lineTo(touches[i].pageX, touches[i].pageY);
				ctx.lineWidth = 8;
				ctx.strokeStyle = color;
				ctx.stroke();

				ongoingTouchesRef.current.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
			} else {
				console.log("can't figure out which touch to continue");
			}
		}
	}, []);

	useEffect(() => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;

		canvas.addEventListener("touchstart", handleStart);
		canvas.addEventListener("touchend", handleEnd);
		canvas.addEventListener("touchcancel", handleCancel);
		canvas.addEventListener("touchmove", handleMove);

		return () => {
			canvas.removeEventListener("touchstart", handleStart);
			canvas.removeEventListener("touchend", handleEnd);
			canvas.removeEventListener("touchcancel", handleCancel);
			canvas.removeEventListener("touchmove", handleMove);
		};
	}, [canvasRef, handleStart, handleEnd, handleCancel, handleMove]);

	return <StyledCanvas ref={canvasRef} width={800} height={600}></StyledCanvas>;
};

const StyledCanvas = styled.canvas`
	border: 2px solid black;
`;

export default Canvas;
