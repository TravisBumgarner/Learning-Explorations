import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const ViewBasedAnimations = () => {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true });
	<div ref={ref}>hii.</div>;
	return (
		<div>
			<Box
				style={{ position: "relative", top: "150vh" }}
				whileInView={{ rotate: "315deg" }}
				transition={{ duration: 0.5 }}
			/>
			<div ref={ref}>Scroll down.</div>
		</div>
	);
};

const Box = styled(motion.div)`
	width: 200px;
	height: 200px;
	margin: 100px;
	background-color: var(--primary-color);
	border-radius: 20px;
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

export default ViewBasedAnimations;
