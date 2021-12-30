const express = require('express')
const app = express()

const db = require('./db')

app.get('/ping', (req, res) => {
  res.send('pong!')
})


app.get('/', async (req, res) => {
  return res.json(await db.selectAll())
})

module.exports = app