const knex = require('./knex')

const insert = async ({ id, body }) => {
    const response = await knex('messages').insert({
        id,
        body,
        timestamp: new Date()
    })
    console.log(response)
}


module.exports = {
    insert
}