import React from "react";
import { render } from "react-dom";



const Card = (props) => {
	return (
		<div>
			<div>
				<img src="http://placehold.it/75" alt=""/>
			</div>
			<div>
				<div>{this.props.name}</div>
				<div>{this.props.company}</div>
			</div>
		</div>

	)
}

class CardList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}
	render(){ 
		return (
			<div>
				{ this.props.cards.map(card=> <Card {...card} />) }
				
			}
			</div>
		)
	}
}

const data = [
	{
		name: "Bob",
		company: "X"
	},
	{
		name: "Sally",
		company: "Y"
	},
	{
		name: "Steve",
		company: "Z"
	}
]


class App extends React.Component {
	// render() returns what needs to be rendered
	// jsx renders JavaScript that then writes the html out
	constructor(){
		super();
		this.state = {
		};

	}




	render(){ 
		return (
			<div className = "container">
				Hello
				<CardList cards = {data} />
			</div>
		);
	} 
}

render(<App/>, window.document.getElementById("app")); // How it should be rendered