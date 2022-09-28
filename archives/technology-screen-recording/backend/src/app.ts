import express from 'express';

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.get('/text', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})


export default app