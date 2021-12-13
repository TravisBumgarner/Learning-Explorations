require('dotenv').config()
const path = require('path')

const axios = require('axios')
const express = require('express')

const app = express()
app.use('/public', express.static(path.join(__dirname, 'public')))

const fetchCSV = async () => {
  const { data } = await axios.get(process.env.SPREADSHEET_URL)
  return data
}

const csvJSON = (csv) => {
  const lines = csv.split('\r\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentline = lines[i].split(',')

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }

  return JSON.stringify(result)
}

app.get('/', (request, response) => {
  response.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

app.get('/data', async (_request, response) => {
  const data = await fetchCSV()

  return response.send(csvJSON(data))
})

const port = 8000
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
