import { String, Record } from 'runtypes'
import 'dotenv/config'

const Env = Record({
    S3: Record({
        Bucket: String,
        Region: String
    }),
    AWS: Record({
        AccessKeyID: String,
        SecretAccessKey: String
    })
})

const getEnv = () => {
    const env = {
        S3: {
            Bucket: process.env.S3_BUCKET,
            Region: process.env.S3_REGION,
        },
        AWS: {
            AccessKeyID: process.env.AWS_ACCESS_KEY_ID,
            SecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    }
    try {
        return Env.check(env)
    } catch (error) {
        throw Error('Invalid project config')
    }
}

const config = getEnv()

export default config
