import React, { useRef, useEffect } from 'react'

import { Body, Title } from 'sharedComponents'

const YoutubeEmbed = () => (
  <div className="video-responsive">
    <iframe
      width="500"
      height="480"
      src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

const App = () => {
  const audioContext = useRef<AudioContext>(new AudioContext())

  return (
    <Body>
      <Title>Hello World!</Title>
      <p>Vivamus lobortis elit vitae quam luctus vestibulum. Fusce vel nulla purus. Praesent aliquam, augue quis malesuada cursus, arcu turpis scelerisque purus, id sagittis diam urna sed odio. Donec eleifend erat vitae porttitor pulvinar. Nulla vel fermentum nunc. Aenean facilisis odio sit amet dolor venenatis hendrerit. Mauris purus massa, malesuada sed mi a, aliquam ullamcorper justo. Sed ac nulla dui.</p>
      <YoutubeEmbed />
    </Body>
  )
}

export default App
