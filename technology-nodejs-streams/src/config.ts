import { String, Record } from 'runtypes'
import 'dotenv/config'

const Env = Record({
    foo: String,
})

const getEnv = () => {
    const env = {
        foo: process.env.FOO,
    }
    try {
        return Env.check(env)
    } catch (error) {
        throw Error('Invalid project config')
    }
}

const config = getEnv()

export default config
