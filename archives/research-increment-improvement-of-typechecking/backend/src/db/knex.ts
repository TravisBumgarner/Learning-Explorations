import path from 'path'

import Knex from 'knex'


const environment = process.env.NODE_ENV || 'development'

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, './db.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, './migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, './seeds')
    },
    useNullAsDefault: true
}

export default Knex(knexConfig)
