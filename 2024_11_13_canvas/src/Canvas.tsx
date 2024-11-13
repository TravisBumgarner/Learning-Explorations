import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

const ASPECT_RATIO = 16 / 9
const CANVAS_START_HEIGHT = 500
const CANVAS_START_WIDTH = CANVAS_START_HEIGHT * ASPECT_RATIO

const PALETTE_SIDE_LENGTH = 25
const PALETTE_DIF = 25

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const getVideo = useCallback(() => {
    const video = videoRef.current
    if (video) {
      console.log('video exists')
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream
          video.play()
        })
        .catch(err => {
          console.error('Error accessing webcam: ', err)
        })
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      alert("this browser doesn't support canvas rendering")
      return
    }

    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, CANVAS_START_WIDTH, CANVAS_START_HEIGHT)

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 400, 400)

    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.moveTo(75, 50)
    ctx.lineTo(100, 75)
    ctx.lineTo(100, 25)
    ctx.fill()

    ctx.font = '20px Times New Roman'
    ctx.fillStyle = 'yellow'
    ctx.fillText('Sample String', CANVAS_START_WIDTH - 150, 30)
  }, [])

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      alert("this browser doesn't support canvas rendering")
      return
    }
    console.log('??')

    const img = new Image()
    img.src =
      'https://storage.googleapis.com/photo21-asdqwd/photos/thumbnail/DJI_0114.jpg'
    img.onload = () => {
      ctx.drawImage(img, 100, 100)
      console.log('done')
    }
  }, [])

  const generateColor = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      alert("this browser doesn't support canvas rendering")
      return
    }

    const red = Math.random() * 255
    const green = Math.random() * 255
    const blue = Math.random() * 255

    for (let i = 0; i < 10; i++) {
      const color = `rgb(${red + i * PALETTE_DIF}, ${
        green + i * PALETTE_DIF
      }, ${blue + i * PALETTE_DIF})`
      ctx.fillStyle = color
      ctx.fillRect(
        PALETTE_SIDE_LENGTH * i,
        0,
        PALETTE_SIDE_LENGTH,
        PALETTE_SIDE_LENGTH
      )
    }
  }, [])

  const linearGradient = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      alert("this browser doesn't support canvas rendering")
      return
    }

    const linGrad = ctx.createLinearGradient(0, 0, 0, 150)
    linGrad.addColorStop(0, '#00ABEB')
    linGrad.addColorStop(0.5, '#fff')
    linGrad.addColorStop(0.5, '#26C000')
    linGrad.addColorStop(1, '#fff')

    // assign gradients to fill and stroke styles
    ctx.fillStyle = linGrad

    // draw shapes
    ctx.fillRect(10, 10, 130, 130)
  }, [])

  const toggleScreenshotMenu = useCallback(() => {
    getVideo()
    dialogRef.current?.showModal()
  }, [getVideo])

  const takeScreenshot = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      alert("this browser doesn't support canvas rendering")
      return
    }

    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
  }, [])

  const geocitiesify = useCallback(() => {
  }, [])

  return (
    <>
      <ScreenShotMenu ref={dialogRef}>
        <p>Greetings, one and all!</p>
        <video ref={videoRef}></video>
        <button onClick={takeScreenshot}>Screenshot</button>
        <form method="dialog">
          <button>Close</button>
        </form>
      </ScreenShotMenu>
      <button onClick={generateColor}>Generate Color</button>
      <button onClick={linearGradient}>Linear Gradient</button>
      <button onClick={drawImage}>Draw Image</button>
      <button onClick={toggleScreenshotMenu}>Take Screenshot</button>
      <button onClick={geocitiesify}>Geocitiesify</button
      <StyledCanvas
        ref={canvasRef}
        width={CANVAS_START_WIDTH}
        height={CANVAS_START_HEIGHT}
      >
        <p>This is an exploration into styled canvases.</p>
      </StyledCanvas>
    </>
  )
}

const ScreenShotMenu = styled.dialog`
  video {
    height: 500px;
  }

  ::backdrop {
    background-image: linear-gradient(
      45deg,
      magenta,
      rebeccapurple,
      dodgerblue,
      green
    );
    opacity: 0.75;
  }
`

const StyledCanvas = styled.canvas`
  border: 1px solid red;
  width: 100%;
  height: auto;
`

export default Canvas
