import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { RouteWrapper } from "./styles";

const BasicsOfMotion = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggle = useCallback(() => {
		setIsVisible((prev) => !prev);
	}, []);

	return (
		<RouteWrapper>
			<Button layout onClick={toggle}>
				Toggle
			</Button>
			<AnimatePresence>
				{isVisible && (
					<Box
						initial={{ rotate: "0deg" }}
						animate={{ rotate: ["180deg", "-0deg", "180deg"] }}
						transition={{ duration: 1, ease: "easeInOut" }}
						exit={{ rotate: "0deg" }}
					/>
				)}
			</AnimatePresence>
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

export default BasicsOfMotion;
