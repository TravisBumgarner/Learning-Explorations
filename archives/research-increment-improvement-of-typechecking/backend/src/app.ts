require('dotenv').config()
import express from 'express';
import cors from 'cors'

import * as db from './db'

const app = express()

// Body Parsing
app.use(express.json());

// Cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(cors({ origin: ['localhost:3000',] }))

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

export default app