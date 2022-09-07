import React from 'react'
import styled from 'styled-components'

import {context} from './Context'

const VIDEO_WIDTH = 700;
const VIDEO_HEIGHT = 400;

const Warning = styled.div`
  width: ${VIDEO_WIDTH}px;
  height: ${VIDEO_HEIGHT}px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
`

const VideoPlayer = () => {
    const {state} = React.useContext(context)
    return (
        <div>
            <h1>Videos Player</h1>
            {state.selectedVideo === null
                ? <Warning>Select a Video</Warning>
                : <div>
                    <a href={state.videos[state.selectedVideo]} download={state.selectedVideo}>Download</a>
                    <video width={VIDEO_WIDTH} height={VIDEO_HEIGHT} controls src={state.videos[state.selectedVideo]} />
                </div>
            }
        </div>
    )
}

type VideoListItemProps = { id: string }

const VideoListItem = ({id}: VideoListItemProps) => {
    const {dispatch} = React.useContext(context)

    const handleClick = () => dispatch({type: "SET_SELECTED_VIDEO", payload: id})

    return (
        <li>
            <button onClick={handleClick}>Play {id}</button>
        </li>
    )
}

const VideoList = () => {
    const { state} = React.useContext(context)

    return (
        <div>
            <h1>Videos</h1>
            <ul>
                {Object.keys(state.videos).map(id => <VideoListItem id={id} />)}
            </ul>
            <VideoPlayer />
        </div>
    )
}

export default VideoList