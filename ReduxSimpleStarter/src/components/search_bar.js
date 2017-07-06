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
                <input
                    value = {this.state.term}
                    onChange={event => this.onInputChange(event.target.value)} 
                />
            </div>
            );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term)
    }
}

export default SearchBar; // Any app that imporst file will only get searchBar