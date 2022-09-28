import express from 'express';
import fs from 'fs'
import path from 'path'

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('pong!')
})


app.get('/stream', (req: express.Request, res: express.Response) => {
    const range = req.headers.range // Position in video `range bytes=3702784-`
    console.log('range', range)
    const videoPath = path.join(__dirname, './video.mov') // Note video is .gitignore'd
    const videoSize = fs.statSync(videoPath).size
    const chunkSize = 1 * 1e+6; // 1MB

    const start = Number(range?.replace(/\D/g, ''))
    const end = Math.min(start + chunkSize, videoSize - 1)

    const contentLength = end - start + 1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }

    res.writeHead(206, headers) // Partial content status

    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res) // creates socket between client and server
})


export default app