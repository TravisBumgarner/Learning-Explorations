import express from 'express';

import * as redis from './redis'

const app = express()


app.get('/', async (req: express.Request, res: express.Response) => {
  const data = await redis.get()
  res.send(data)
})

export default app