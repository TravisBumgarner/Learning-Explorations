import express from 'express';
import fs from "fs";
import path from 'path'

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.post('/fileupload', (req: express.Request, res: express.Response) => {
  const filePath = path.join(__dirname, `/image.jpg`);
  const stream = fs.createWriteStream(filePath);
  console.log(req)
  stream.on('open', () => req.pipe(stream))

  stream.on('drain', () => {
    // Calculate how much data has been piped yet
    const written = stream.bytesWritten;
    const total = parseInt(req.headers['content-length'] || '-1');
    const pWritten = (written / total * 100).toFixed(2)
    console.log(`Processing  ...  ${pWritten}% done`);
   });
   
   stream.on('close', () => {
    // Send a success response back to the client
    const msg = `Data uploaded to ${filePath}`;
    console.log('Processing  ...  100%');
    console.log(msg);
    res.status(200).send({ status: 'success', msg });
   });
   
   stream.on('error', err => {
    // Send an error message to the client
    console.error(err);
    res.status(500).send({ status: 'error', err });
   });
})

export default app