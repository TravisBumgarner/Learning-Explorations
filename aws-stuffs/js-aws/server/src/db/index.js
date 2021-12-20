const knex = require('./knex')

const insert = async ({ id, body, timestamp }) => {
    const response = await knex('messages').insert({
        id,
        body,
        timestamp
    })
    console.log(response)
}


module.exports = {
    insert
}