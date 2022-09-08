const express = require('express')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
const { Buffer } = require('buffer')
const cors = require('cors')

// file path
const STATIC_FILES = path.join(__dirname, './static/files')
// Temporary path to upload files
const STATIC_TEMPORARY = path.join(__dirname, './static/temporary')
const server = express()

server.use(cors({
    origin: '*'
}));

// Static file hosting
server.use(express.static(path.join(__dirname, './dist')))
// Interface for uploading slices

server.post('/upload', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        let filename = fields.filename[0]
        let hash = fields.hash[0]
        let chunk = files.chunk[0]
        let dir = `${STATIC_TEMPORARY}/${filename}`
        // console.log(filename, hash, chunk)
        try {
            if (!fs.existsSync(dir)) fs.mkdirSync(dir)
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

//Merged slice interface
server.get('/merge', async (req, res) => {
    const { filename } = req.query
    try {
        let len = 0
        const bufferList = fs.readdirSync(`${STATIC_TEMPORARY}/${filename}`).map((hash, index) => {
            const buffer = fs.readFileSync(`${STATIC_TEMPORARY}/${filename}/${index}`)
            len += buffer.length
            return buffer
        });
        //Merge files
        const buffer = Buffer.concat(bufferList, len);
        const ws = fs.createWriteStream(`${STATIC_FILES}/${filename}`)
        ws.write(buffer);
        ws.close();
        res.send(`Section merge completed`);
    } catch (error) {
        console.error(error);
    }
})

server.listen(3000, _ => {
    console.log('http://localhost:3000/')
})