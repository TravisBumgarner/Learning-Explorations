

import 'dotenv/config'
import { String, Record, Number } from 'runtypes'


const Env = Record({
    webhookSlackURL: String
})

const getEnv = () => {
    const env = {
        webhookSlackURL: process.env.WEBHOOK_SLACK_URL
    }
    try {
        return Env.check(env)
    } catch (error) {
        throw Error('Invalid project config')
    }
}

const config = getEnv()

export default config