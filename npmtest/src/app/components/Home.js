import React from 'react';

export class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            age: props.initialAge,
            homeLink: props.initialLinkName
        }
    }

    onMakeOlder(){
        this.setState({
            age: this.state.age + 3
        });
    }

    onChangeLink(){
        this.props.changeLink(this.state.homeLink);
    }
 
    onHandleChange(event){
        this.setState({
            homeLink: event.target.value
        })

    }

    render(){
        return(
            <div>

                <p>In a new component</p>
                { "hello " + "Travis"}
                <p>The user is {this.name} and their age is {this.state.age}</p>
                { this.props.children }
                <button onClick={this.onMakeOlder.bind(this)}>Increase age</button>
                <button onClick = {this.props.greet}>Greet</button>

                <input type="text" value = {this.state.homeLink} onChange ={(event) => this.onHandleChange(event)}/>
                <button onClick = {this.onChangeLink.bind(this)}> Change value </button>
            </div>


        );
    }
}