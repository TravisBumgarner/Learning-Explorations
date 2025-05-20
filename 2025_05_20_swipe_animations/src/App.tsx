import { useCallback, useState } from "react";
import {
	AnimatePresence,
	motion,
	useAnimate,
	useMotionValue,
	useMotionValueEvent,
} from "motion/react";

function getRandomHexColor(): string {
	const hex = Math.floor(Math.random() * 0xffffff).toString(16);
	return `#${hex.padStart(6, "0")}`;
}

const DURATION_MS = 100;
const EXIT_OPTIONS = { duration: DURATION_MS / 1000 };
const exitAnimation = (polarity: 1 | -1) => ({
	opacity: 0,
	x: `${polarity * 100}%`,
});

const Card = ({
	color,
	handleSwipeCallback,
}: {
	color: string;
	handleSwipeCallback: () => void;
}) => {
	const [hitSwipeThreshold, setHitSwipeThreshold] = useState(false);
	const x = useMotionValue(0);
	const [scope, animate] = useAnimate();

	const variants = {};

	useMotionValueEvent(x, "change", (latest) => {
		if (!hitSwipeThreshold) {
			let polarity: 1 | -1 | null = null;
			if (latest > 100) polarity = 1;
			if (latest < -100) polarity = -1;

			if (polarity) {
				setHitSwipeThreshold(true);
				animate(scope.current, exitAnimation(polarity), EXIT_OPTIONS);
				setTimeout(handleSwipeCallback, DURATION_MS);
			}
		}
	});

	return (
		<motion.div
			ref={scope}
			dragConstraints={{ left: 0, right: 0 }}
			dragSnapToOrigin={false}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.1 } }}
			drag={hitSwipeThreshold ? undefined : "x"}
			variants={variants}
			style={{
				x,
				width: "400px",
				height: "800px",
				border: "2px solid black",
				borderRadius: "10px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontSize: "40px",
				backgroundColor: color,
				position: "absolute", // Forces animating cards to vertically stack.
			}}
		>
			<p>{color}</p>
		</motion.div>
	);
};

function App() {
	const [color, setColor] = useState(getRandomHexColor());

	const handleSwipeCallback = useCallback(() => {
		console.log("setting new color)");
		setColor(getRandomHexColor());
	}, []);

	const loadNextCard = () => {
		console.log("Maybe I'm useful?");
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100dvh",
			}}
		>
			<AnimatePresence
				mode="popLayout"
				// onExitComplete={handleSwipeCallback}
			>
				<Card
					key={color}
					color={color}
					handleSwipeCallback={handleSwipeCallback}
				/>
			</AnimatePresence>
		</div>
	);
}

export default App;
