import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import DragAndDrop from "./0_DragAndDrop";
import BasicsOfMotion from "./1_BasicsOfMotion";
import Gestures from "./2_Gestures";
import AnimationControls from "./3_AnimationControls";
import ViewBasedAnimations from "./4_ViewBasedAnimations";
import ScrollBasedAnimations from "./5_ScrollBasedAnimations";
import Home from "./Home";
import Navigation from "./Navigation";
import "./app.css";

function App() {
	return (
		<Wrapper>
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dnd" element={<DragAndDrop />} />
				<Route path="/basicsofmotion" element={<BasicsOfMotion />} />
				<Route path="/gestures" element={<Gestures />} />
				<Route path="/animationcontrols" element={<AnimationControls />} />
				<Route path="/viewbasedanimations" element={<ViewBasedAnimations />} />
				<Route path="/scrollbasedanimations" element={<ScrollBasedAnimations />} />
			</Routes>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
`;

export default App;
