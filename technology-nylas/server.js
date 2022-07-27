const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/ping', (req, res) => {
    res.send('pong!!')
})

app.get('/webhook', (req, res) => {
    console.log('Webhook verification request received')
    res.send(req.query.challenge)
})

/*
{
    "date": 1658777340,
    "object": "account",
    "type": "account.running",
    "object_data": {
        "namespace_id": "---",
        "account_id": "---",
        "object": "account",
        "attributes": null,
        "id": "---",
        "metadata": null
    }
}
*/

app.post('/webhook', (req, res) => {
    const delta = req.body.deltas[0] // Nylas docs say delta.length always === 1
    console.log(JSON.stringify(delta))
    res.sendStatus(200)
})

app.listen(5001, () => {
    console.log(`Example app listening at http://localhost:5001`)
})