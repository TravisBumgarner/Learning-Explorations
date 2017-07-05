import React, { Component} from 'react'; // Need react to convert jsx


// const SearchBar = () => {
//     return <input />
// }

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() { // Syntax for a Class method
        return (
            <div>
                <input onChange={event => this.setState({term:event.target.value})} />
                Value of the input: { this.state.term }
            </div>
            );
    }
}

export default SearchBar; // Any app that imporst file will only get searchBar