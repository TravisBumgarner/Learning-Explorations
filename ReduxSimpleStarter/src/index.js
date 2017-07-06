import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar'; // If we create file ourselves, have to provide rel path
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

const API_KEY = "AIzaSyCNKmmEkDp6w7gIhEuzUGJCbERaUxFxaa4";

class App extends Component{
    constructor(props) {
        super(props);

        this.state = { 
            videos: [], 
            selectedVideo: null
        };

        this.videoSearch("Python intro");

    }

    videoSearch(Term){
       YTSearch(
        {
            key: API_KEY, 
            term: Term
        }, 
        (videos) => {
            this.setState({ 
                videos: videos, 
                selectedVideo: videos[0]
            });
        }); 
    }    

    render(){
        return (
            <div>
                <SearchBar
                    onSearchTermChange={term => this.videoSearch(term)}
                />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) } 
                    videos={this.state.videos} />
            </div>  
        );
    }
}




ReactDOM.render(<App />, document.querySelector('.container')) 