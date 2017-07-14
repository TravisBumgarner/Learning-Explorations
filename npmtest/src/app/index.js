import React from "react";
import { render } from "react-dom";

import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Footer } from "./components/Footer"


class App extends React.Component {
	// render() returns what needs to be rendered
	// jsx renders JavaScript that then writes the html out
	render(){ 

		var user = {
			name: "Bob",
			age: 25,
			hobbies: ["x", "y", "z"]
		}


		return (
			<div className = "container">
				<div className = "row">
					<div className = "col-xs-10 col-xs-offset-1">
						<Header/>
					</div>
				</div>
				<div className = "row">
					<div className = "col-xs-10 col-xs-offset-1">
						<Home name={"Travis"} age={27} user={user}/> {/* These are props */}
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

render(<App/>, window.document.getElementById("app")); // How it should be rendered