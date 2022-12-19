import React, { useState } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './App.css';

function App() {
  const [videoSrc, setVideoSrc] = useState('');
  const [message, setMessage] = useState('Click Start to transcode');
  const ffmpeg = createFFmpeg({
    log: true,
  });
  const doTranscode = async () => {
    setMessage('Loading ffmpeg-core.js');
    await ffmpeg.load();
    setMessage('Start transcoding');
    ffmpeg.FS('writeFile', 'demo2.webm', await fetchFile('/demo2.webm'));
    await ffmpeg.run('-i', 'demo2.webm', 'output.mp4');
    setMessage('Complete transcoding');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
  };
  return (
    <div className="App">
      <p />
      <video src={videoSrc} controls></video><br />
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
