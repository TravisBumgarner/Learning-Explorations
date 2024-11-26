import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {
	return (
		<Nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/dnd">Drag And Drop</Link>
				</li>
			</ul>
		</Nav>
	);
};

const Nav = styled.nav`
	width: 250px;
	height: 100%;
	background-color: #f4f4f4;

	ul {
		list-style-type: none;
		margin: 16px;
		padding: 0;

		li {
			padding: 8px;
			border: 1px solid #ccc;
			border-radius: 4px;
			margin-bottom: 16px;

			a {
				text-decoration: none;
			}
		}
	}
`;

export default Navigation;
