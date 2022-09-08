import fs from 'fs'
import path from 'path'
import { Buffer } from 'buffer'

import cors from 'cors'
import express from 'express'
import multiparty from 'multiparty'

const STATIC_FILES = path.join(__dirname, './static/files')
const STATIC_TEMPORARY = path.join(__dirname, './static/temporary')

const app = express()

app.use(cors({ origin: '*' }));

app.use(express.static(path.join(__dirname, './static')))

app.get('/images', (req, res) => {
    const files = fs.readdirSync(STATIC_FILES)
    res.json({images: files})
})

app.post('/upload', (req, res) => {
    const form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        let filename = fields.filename[0]
        let hash = fields.hash[0]
        let chunk = files.chunk[0]
        let dir = `${STATIC_TEMPORARY}/${filename}`

        try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
            const buffer = fs.readFileSync(chunk.path)
            const ws = fs.createWriteStream(`${dir}/${hash}`)
            ws.write(buffer)
            ws.close()
            res.send(`${filename}-${hash} Section uploaded successfully`)
        } catch (error) {
            console.error(error)
            res.status(500).send(`${filename}-${hash} Section uploading failed`)
        }
    })
})

app.get('/merge', async (req, res) => {
    const { filename } = req.query
    const tempDir = path.join(STATIC_TEMPORARY, filename as string)
    
    try {
        let len = 0
        const bufferList = fs.readdirSync(tempDir).map((_, hash) => {
            const tempFile = path.join(tempDir, String(hash))
            const buffer = fs.readFileSync(tempFile)
            len += buffer.length
            return buffer
        });
        //Merge files
        const buffer = Buffer.concat(bufferList, len);
        if (!fs.existsSync(STATIC_FILES)) fs.mkdirSync(STATIC_FILES, { recursive: true })
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`)
        ws.write(buffer);
        ws.close();
        res.send(`Section merge completed`);

        fs.rmSync(tempDir, {recursive: true, force: true})
    } catch (error) {
        console.error(error);
    }
})

app.listen(5001, () => {
    console.log('http://localhost:5001/')
})