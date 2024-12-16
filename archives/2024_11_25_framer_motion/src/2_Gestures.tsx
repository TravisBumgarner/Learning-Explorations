import { motion, MotionConfig } from "framer-motion";
import styled from "styled-components";
import { RouteWrapper } from "./styles";

const Gestures = () => {
	return (
		<RouteWrapper>
			<Button
				whileInView={{ rotate: "45deg" }}
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.8, rotate: "10deg" }}
				transition={{ diration: 0.2 }}
			>
				Hello
			</Button>
			<MotionConfig transition={{ duration: 2, ease: "easeInOut" }}>
				<Button
					whileHover={{ scale: 3 }}
					whileTap={{ scale: 0.8, rotate: "10deg" }}
				>
					We are twins
				</Button>
				<Button
					whileHover={{ scale: 3 }}
					whileTap={{ scale: 0.8, rotate: "10deg" }}
				>
					We are twins
				</Button>
			</MotionConfig>
		</RouteWrapper>
	);
};

const Button = styled(motion.button)`
	background: var(--primary-color);
	color: var(--dark-text-color);
	font-size: 1.8rem;
	border-radius: 0.4rem;
	border: none;
	padding: 0.4rem 0.8rem;
	cursor: pointer;
`;

export default Gestures;
