import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import DragAndDrop from "./0_DragAndDrop";
import BasicsOfMotion from "./1_BasicsOfMotion";
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
			</Routes>
			B
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
`;

export default App;
