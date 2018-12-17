const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()

const schema = require('./schema')

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    })
)

app.listen(3001)
console.log('listening...')
