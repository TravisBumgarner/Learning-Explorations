import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { mapRGBToNearestWebColor } from './webColors'

const ASPECT_RATIO = 16 / 9
const CANVAS_START_HEIGHT = 500
const CANVAS_START_WIDTH = Math.round(CANVAS_START_HEIGHT * ASPECT_RATIO)

const PALETTE_SIDE_LENGTH = 25
const PALETTE_DIF = 25

const getMousePosition = (canvas: HTMLCanvasElement, event: MouseEvent) => {
  /// getBoundingClientRect is supported in most browsers and gives you
  /// the absolute geometry of an element
  var rect = canvas.getBoundingClientRect()

  /// as mouse event coords are relative to document you need to
  /// subtract the element's left and top position:
  return { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [colorPicker, setColorPicker] = useState('')

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
    const ctx = getCanvasContext()
    if (!ctx) return

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

  const getCanvasContext = () => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      alert("this browser doesn't support canvas rendering")
      return null
    }

    return ctx
  }

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = getCanvasContext()
    if (!ctx) return
    console.log('??')

    const img = new Image()
    img.src =
      'https://storage.googleapis.com/photo21-asdqwd/photos/thumbnail/DJI_0114.jpg'
    img.onload = () => {
      img.crossOrigin = 'Anonymous'
      const scaleFactor = 0.5 // Change this to your desired scale factor
      const scaledWidth = img.width * scaleFactor
      const scaledHeight = img.height * scaleFactor
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight)
      console.log('done')
    }
  }, [])

  const generateColor = useCallback(() => {
    const ctx = getCanvasContext()
    if (!ctx) return

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
    const ctx = getCanvasContext()
    if (!ctx) return

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
    const aspectRatio = video.videoWidth / video.videoHeight
    const newWidth = canvas.width
    const newHeight = newWidth / aspectRatio

    ctx.drawImage(video, 0, 0, newWidth, newHeight)
  }, [])

  const geocitiesify = useCallback(() => {
    const ctx = getCanvasContext()
    if (!ctx) return

    const myImageData = ctx.getImageData(
      0,
      0,
      CANVAS_START_WIDTH,
      CANVAS_START_HEIGHT
    )
    const newImageData = new ImageData(CANVAS_START_WIDTH, CANVAS_START_HEIGHT)
    // console.log('started', myImageData)
    for (let i = 0; i < myImageData.data.length; i += 4) {
      const r = myImageData.data[i]
      const g = myImageData.data[i + 1]
      const b = myImageData.data[i + 2]

      const webColor = mapRGBToNearestWebColor(r, g, b)
      // console.log('start', { r, g, b }, 'end', webColor)
      newImageData.data[i] = webColor.r
      newImageData.data[i + 1] = webColor.g
      newImageData.data[i + 2] = webColor.b
      newImageData.data[i + 3] = 255 // Set alpha channel to fully opaque
    }
    ctx.putImageData(newImageData, 0, 0)
    // console.log('ended', newImageData)
  }, [])

  // const colorPicker = useCallback(() => {
  //   const ctx = getCanvasContext()
  //   if (!ctx) return

  //   const color = ctx.getImageData(0, 0, 1, 1).data
  // }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return
      const position = getMousePosition(canvasRef.current, event)

      if (
        position.x < 0 ||
        position.y < 0 ||
        position.x > CANVAS_START_WIDTH ||
        position.y > CANVAS_START_HEIGHT
      )
        return

      console.log('canvas coords', position)

      const ctx = getCanvasContext()
      if (!ctx) return

      const myImageData = ctx.getImageData(
        0,
        0,
        CANVAS_START_WIDTH,
        CANVAS_START_HEIGHT
      )

      const imageDataPosition =
        (position.y * CANVAS_START_WIDTH + position.x) * 4
      const r = myImageData.data[imageDataPosition]
      const g = myImageData.data[imageDataPosition + 1]
      const b = myImageData.data[imageDataPosition + 2]
      const a = myImageData.data[imageDataPosition + 3]

      if (
        r === undefined ||
        g === undefined ||
        b === undefined ||
        a === undefined
      ) {
        console.error('Invalid image data position:', imageDataPosition)
        return
      }

      const newColor = `rgba(${r}, ${g}, ${b}, ${a})`
      setColorPicker(newColor)
      console.log('color', { r, g, b, a }, newColor)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [canvasRef])

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
      <button onClick={geocitiesify}>Geocitiesify</button>
      <ColorPicker color={colorPicker} />
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

const ColorPicker = ({ color }: { color: string }) => {
  return (
    <div>
      <p>Color Picker</p>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: color
        }}
      >
        {color}
      </div>
    </div>
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
`

export default Canvas
