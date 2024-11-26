import styled from "styled-components";
import { RouteWrapper } from "./styles";

const BasicsOfMotion = () => {
	return (
		<RouteWrapper>
			<Button>Click Me.</Button>
		</RouteWrapper>
	);
};

const Button = styled.button`
	background: var(--primary-color);
	color: #1b1b1b;
	font-size: 1.8rem;
	border-radius: 0.4rem;
	border: none;
	padding: 0.4rem 0.8rem;
	cursor: pointer;
`;

export default BasicsOfMotion;
