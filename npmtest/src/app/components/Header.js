import React from 'react';

export class Header extends React.Component { // Make available in index.js
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav">
                            <li><a href = "#">{this.props.homeLink}</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
} 