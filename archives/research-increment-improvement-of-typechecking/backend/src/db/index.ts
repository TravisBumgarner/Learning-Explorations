import knex from './knex'

type Insert = {
    id: string
    body: string
    timestamp: number
}

const insert = async ({ id , body, timestamp }: Insert) => {
    const response = await knex('messages').insert({
        id,
        body,
        timestamp
    })
}

const selectAll = async () => {
    const response = await knex.select('*').from('messages')
    return response
}

export default {
    insert,
    selectAll
}