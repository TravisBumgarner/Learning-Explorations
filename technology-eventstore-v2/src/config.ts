import { String, Record, Number } from 'runtypes'

require('dotenv').config({ path: `.env` })

const Env = Record({
    postgres: Record({
        host: String,
        port: Number,
        username: String,
        password: String,
        database: String,
    })
})

const getEnv = () => {
    const env = {
        postgres: {
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORTNAME || '', 10),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
        },
    }
    try {
        return Env.check(env)
    } catch (error) {
        throw Error('Invalid project config')
    }
}

const config = getEnv()

export default config