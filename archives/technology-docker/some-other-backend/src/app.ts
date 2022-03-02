import express from 'express';
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('some-other-backend!')
})



export default app