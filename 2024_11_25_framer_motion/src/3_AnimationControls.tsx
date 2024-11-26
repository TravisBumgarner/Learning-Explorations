import { motion, useAnimationControls } from "framer-motion";
import styled from "styled-components";
import { RouteWrapper } from "./styles";

const AnimationControls = () => {
	const controls = useAnimationControls();

	const animateButton = () => {
		controls.start("spin");
	};

	return (
		<RouteWrapper>
			<Box
				initial="initial"
				variants={{
					initial: {
						rotate: "45deg",
					},
					spin: {
						rotate: "315deg",
					},
					expand: {
						scale: 1.5,
					},
				}}
				whileHover="spin"
				whileTap="expand"
				animate={controls}
				transition={{ duration: 0.5 }}
			/>
			<Button onClick={animateButton}>Click me</Button>
		</RouteWrapper>
	);
};

const Box = styled(motion.div)`
	width: 200px;
	height: 200px;
	margin: 100px;
	background-color: var(--primary-color);
`;

const Button = styled(motion.button)`
	background: var(--primary-color);
	color: var(--dark-text-color);
	font-size: 1.8rem;
	border-radius: 0.4rem;
	border: none;
	padding: 0.4rem 0.8rem;
	cursor: pointer;
`;

export default AnimationControls;
