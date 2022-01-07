import path from 'path'

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'test.db')
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'seeds')
    },
    useNullAsDefault: true
}

export default knexConfig