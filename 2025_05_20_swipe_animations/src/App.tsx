import { useCallback, useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useMotionValueEvent,
} from "motion/react";

function getRandomHexColor(): string {
	const hex = Math.floor(Math.random() * 0xffffff).toString(16);
	return `#${hex.padStart(6, "0")}`;
}

const Card = ({
	color,
	handleSwipeCallback,
}: {
	color: string;
	handleSwipeCallback: () => void;
}) => {
	const hasSwipedRef = useRef(false);
	const x = useMotionValue(0);
	const [polarity, setPolarity] = useState(1);

	const variants = {};

	useMotionValueEvent(x, "change", (latest) => {
		if ((latest > 200 || latest < -200) && hasSwipedRef.current === false) {
			console.log("I call", latest);
			hasSwipedRef.current = true;
			handleSwipeCallback();
		}
	});

	return (
		<motion.div
			exit={{ transform: `translateX(${polarity * 100}%)` }}
			dragConstraints={{ left: 0, right: 0 }}
			drag="x"
			variants={variants}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
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
