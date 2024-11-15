import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

const Paragraph = ({ text }: { text: string }) => {
	return (
		<motion.p
			transition={{ duration: 2 }}
			animate={{ scale: 1 }}
			whileInView={{ scale: 2 }}
		>
			{text}
		</motion.p>
	);
};

const ProgressBar = () => {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				height: 10,
				backgroundColor: "silver",
				scaleX: scrollYProgress,
				transformOrigin: "0%",
			}}
		/>
	);
};

const MotionLibScrollingPOC = () => {
	const [show, setShow] = useState(true);

	return (
		<div>
			<ProgressBar />
			<ScrollPage bgColor="darkred">
				<div>
					<motion.button
						whileTap={{ scale: 0.95 }}
						onClick={() => setShow(!show)}
					>
						{show ? "Remove" : "Add"}
					</motion.button>
				</div>
                <div>
				<AnimatePresence>
					{show ? (
						<motion.div
							className="box"
							exit={{ opacity: 0, scale: 1.1 }}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
						>
							Animate meee{" "}
						</motion.div>
					) : null}
				</AnimatePresence>
                </div>
			</ScrollPage>
			<ScrollPage bgColor="darkblue">
				<Paragraph text="page2" />
			</ScrollPage>
			<ScrollPage bgColor="darkgreen">
				<Paragraph text="page3" />
			</ScrollPage>
		</div>
	);
};

const ScrollPage = styled.div<{ bgColor: string }>`
	display: flex;
	justify-content: center;
    flex-direction: column;
	align-items: center;
	height: 100vh;
	color: white;
	background-color: ${(props) => props.bgColor};
`;

export default MotionLibScrollingPOC;
