import React from 'react';

export class Home extends React.Component {
    render(){
        console.log(this.props)

        return(
            <div>
                <p>In a new component</p>
                { "hello " + "Travis"}
                <p>The user is {this.props.user.name} and their age is {this.props.user.age}</p>
                <ul>
                    {this.props.user.hobbies.map((hobby, idx)=> <li key={idx}>{hobby}</li>)}
                </ul>
            </div>
        );
    }
}