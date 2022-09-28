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

const STATIC_FILES = path.join(__dirname, './static/files')

app.post('/upload', (req, res) => {
  const form = new multiparty.Form();
  console.log(req.body)
  form.parse(req, function (err, fields, files) {
      console.log(fields)
      // let dir = `${STATIC_TEMPORARY}/${filename}`

      // try {
      //     if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      //     const buffer = fs.readFileSync(chunk.path)
      //     const ws = fs.createWriteStream(`${dir}/${hash}`)
      //     ws.write(buffer)
      //     ws.close()
      //     res.send(`${filename}-${hash} Section uploaded successfully`)
      // } catch (error) {
      //     console.error(error)
      //     res.status(500).send(`${filename}-${hash} Section uploading failed`)
      // }
  })
  res.send("thanks for your data!")
})

const port = 5001

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })