const express = require('express')
const graphQLHTTP = require('express-graphql')

import schema from './schema'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(3001)
console.log('listening...')
