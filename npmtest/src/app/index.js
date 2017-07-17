import React from "react";
import { render } from "react-dom";

import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Footer } from "./components/Footer"


class App extends React.Component {
	// render() returns what needs to be rendered
	// jsx renders JavaScript that then writes the html out
	constructor(){
		super();
		this.state = {
			homeLink: "Home"
		};
		console.log("Constructor");
	}

	componentWillMount(){
		console.log("Component Will Mount");
	}

	onGreet() {
		alert("Hello");
	} 

	onChangeLinkName(newName){
		this.setState({
			homeLink: newName
		})
	}

	render(){ 
		return (
			<div className = "container">
				<div className = "row">
					<div className = "col-xs-10 col-xs-offset-1">
						<Header homeLink = {this.state.homeLink}>
							<p> More header text</p>
						</Header>
					</div>
				</div>
				<div className = "row">
					<div className = "col-xs-10 col-xs-offset-1">
						<Home 
							name={"Travis"} 
							initialAge={27} 
							greet = {this.onGreet}
							changeLink = {this.onChangeLinkName.bind(this)}
							initialLinkName = {this.state.homeLink}

						/>
					</div>
				</div>
				<div className = "row">
					<div className = "col-xs-10 col-xs-offset-1">
						<Footer/>
					</div>
				</div>
			</div>
		);
	} 
}

Home.PropTypes = {
	name: React.PropTypes.string,
	user: React.PropTypes.string
}

render(<App/>, window.document.getElementById("app")); // How it should be rendered