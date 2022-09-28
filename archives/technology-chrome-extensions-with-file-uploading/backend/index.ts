import express from 'express';
import path from 'path'
import fs from 'fs'
import multiparty from 'multiparty'
import cors from 'cors'
import bodyParser from 'body-parser';

const app = express()
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('pong!')
})

app.post('/upload', (req, res) => {
  const form = new multiparty.Form();
  console.log(req.body)
  form.parse(req, function (err, fields, files) {
      console.log(fields)
  })
  res.send("thanks for your data!")
})

const port = 5001

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })