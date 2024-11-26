import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import DragAndDrop from "./DragAndDrop";
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
