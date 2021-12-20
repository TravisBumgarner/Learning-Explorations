const path = require('path')

module.exports = {
    development: {
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
}