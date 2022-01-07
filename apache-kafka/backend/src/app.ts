import express from 'express';

import { producer } from './kafka';

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.get('/kafka/:message', async (req: express.Request, res: express.Response) => {
  await producer(req.params.message)
  return res.send('success~!')
})

export default app