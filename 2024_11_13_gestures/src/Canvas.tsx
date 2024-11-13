import { useEffect, useRef } from "react";
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
	let r = touch.identifier % 16;
	let g = Math.floor(touch.identifier / 3) % 16;
	let b = Math.floor(touch.identifier / 7) % 16;
	const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
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

	const handleStart = (evt: TouchEvent) => {
		evt.preventDefault();
		console.log("touchstart.");
		const ctx = canvasRef.current?.getContext("2d");
		const touches = evt.changedTouches;

		if (!ctx) return;

		for (let i = 0; i < touches.length; i++) {
			console.log(`touchstart: ${i}.`);
			ongoingTouchesRef.current.push(copyTouch(touches[i]));
			const color = colorForTouch(touches[i]);
			console.log(`color of touch with id ${touches[i].identifier} = ${color}`);
			ctx.beginPath();
			ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false); // a circle at the start
			ctx.fillStyle = color;
			ctx.fill();
		}
	};

	const handleEnd = (evt: TouchEvent) => {
        evt.preventDefault();
        console.log("touchend");
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return

        const touches = evt.changedTouches;
      
        for (let i = 0; i < touches.length; i++) {
          const color = colorForTouch(touches[i]);
          let idx = ongoingTouchIndexById(touches[i].identifier);
      
          if (idx >= 0) {
            ctx.lineWidth = 4;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(ongoingTouchesRef.current[idx].pageX, ongoingTouchesRef.current[idx].pageY);
            ctx.lineTo(touches[i].pageX, touches[i].pageY);
            ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8); // and a square at the end
            ongoingTouchesRef.current.splice(idx, 1); // remove it; we're done
          } else {
            console.log("can't figure out which touch to end");
          }
        }
	};

	const handleCancel = (e: TouchEvent) => {
        e.preventDefault();
        console.log("touchcancel.");
        const touches = e.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            ongoingTouchesRef.current.splice(i, 1); // remove it; we're done
        }
	};

	const handleMove = (evt: TouchEvent) => {
		evt.preventDefault();
		const ctx = canvasRef.current?.getContext("2d");
		const touches = evt.changedTouches;

		if (!ctx) return;

		for (let i = 0; i < touches.length; i++) {
			const color = colorForTouch(touches[i]);
			const idx = ongoingTouchIndexById(touches[i].identifier);

			if (idx >= 0) {
				console.log(`continuing touch ${idx}`);
				ctx.beginPath();
				console.log(
					`ctx.moveTo( ${ongoingTouchesRef.current[idx].pageX}, ${ongoingTouchesRef.current[idx].pageY} );`
				);
				ctx.moveTo(
					ongoingTouchesRef.current[idx].pageX,
					ongoingTouchesRef.current[idx].pageY
				);
				console.log(`ctx.lineTo( ${touches[i].pageX}, ${touches[i].pageY} );`);
				ctx.lineTo(touches[i].pageX, touches[i].pageY);
				ctx.lineWidth = 4;
				ctx.strokeStyle = color;
				ctx.stroke();

				ongoingTouchesRef.current.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
			} else {
				console.log("can't figure out which touch to continue");
			}
		}
	};

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
	}, [canvasRef]);

	return <StyledCanvas ref={canvasRef} width={800} height={600}></StyledCanvas>;
};

const StyledCanvas = styled.canvas`
	border: 2px solid black;
`;

export default Canvas;
