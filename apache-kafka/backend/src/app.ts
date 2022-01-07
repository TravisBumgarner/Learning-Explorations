import express from 'express';
import cors from 'cors'

import { producer } from './kafka';
import { ColorCounts } from '../../sharedTypes'

const app = express()

app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.get('/buttons', (req: express.Request, res: express.Response) => {
  const colorCounts: ColorCounts = {
    red: 1,
    green: 2,
    blue: 5
  }
  res.json(colorCounts)
})

app.post('/button-press/:color', async (req: express.Request, res: express.Response) => {
  await producer(req.params.color)
  return res.send('success!')
})

export default app