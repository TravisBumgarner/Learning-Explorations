import React from 'react'
import styled from 'styled-components'

import { context } from './Context'

const VIDEO_WIDTH = 700;
const VIDEO_HEIGHT = 400;

const Recording = styled.div`
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
                ? <Recording>hmmm</Recording>
                : <div>
                    <a href={state.videos[state.selectedVideo]} download={state.selectedVideo}>Download</a>
                    <video width={VIDEO_WIDTH} height={VIDEO_HEIGHT} controls src={state.selectedVideo} />
                </div>
            }
        </div>
    )
}

export default VideoPlayer

