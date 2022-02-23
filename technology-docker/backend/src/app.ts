import express from 'express';
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(cors())

app.get('/', async (req: express.Request, res: express.Response) => {
  const response = await axios.get("http://some-other-backend:5002")
  console.log(response.data)
  res.send(JSON.stringify(response))
})

export default app