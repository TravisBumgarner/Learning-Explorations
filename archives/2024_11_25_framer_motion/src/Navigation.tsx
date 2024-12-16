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
					<Link to="/dnd">0. Drag And Drop</Link>
				</li>
				<li>
					<Link to="/basicsofmotion">1. Basics of Motion</Link>
				</li>
				<li>
					<Link to="/gestures">2. Gestures</Link>
				</li>
				<li>
					<Link to="/animationcontrols">3. Animation Controls</Link>
				</li>
				<li>
					<Link to="/viewbasedanimations">4. View Based Animations</Link>
				</li>
				<li>
					<Link to="/scrollbasedanimations">5. Scroll Based Animations</Link>
				</li>
			</ul>
		</Nav>
	);
};

const Nav = styled.nav`
	width: 250px;
	flex-shrink: 0;
	height: 100%;
	background-color: #3c3c3c;

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
