import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar'; // If we create file ourselves, have to provide rel path

const API_KEY = "AIzaSyCNKmmEkDp6w7gIhEuzUGJCbERaUxFxaa4";

const App = function(){
    return <div>
        <SearchBar />
    </div>;
}  

ReactDOM.render(<App />, document.querySelector('.container')) 