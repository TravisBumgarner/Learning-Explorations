import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

import kafka from './kafka';
import { ButtonPress, ColorCounts } from '../../sharedTypes'

import db from './db'

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.get('/buttons', async (req: express.Request, res: express.Response) => {
  const colorCounts: ColorCounts = await db.buttons.selectAll()
  console.log(colorCounts)
  res.json(colorCounts)
})

app.post('/button-press', async (req: express.Request, res: express.Response) => {
  kafka.produce(JSON.stringify(req.body))
  return res.send('success!')
})

export default app