const fetch = require('node-fetch')
const util = require('util')
util.promisify(require('xml2js').parseString)

const x = fetch(
    'https://www.goodreads.com/author/show.xml?id=4432&key=risKm8wwXsIcyEiTktvA'
).then(response => response.text())

x