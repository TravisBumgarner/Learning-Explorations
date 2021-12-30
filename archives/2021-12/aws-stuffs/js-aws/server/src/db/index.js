const knex = require('./knex')

const insert = async ({ id, body, timestamp }) => {
    const response = await knex('messages').insert({
        id,
        body,
        timestamp
    })
    console.log(response)
}

const selectAll = async () => {
    const response = await knex.select('*').from('messages')
    console.log(response)
    return response
}

module.exports = {
    insert,
    selectAll
}