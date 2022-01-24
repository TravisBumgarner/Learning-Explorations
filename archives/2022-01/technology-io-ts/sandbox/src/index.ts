import * as t from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'

const UserCodec = t.type({
    userId: t.number,
    name: t.string
})
type UserCodec = t.TypeOf<typeof UserCodec>

type DecodeResponseParams = {
    codec: t.TypeC<any>,
    rawResponse: any,
    onError?: (rawResponse?: any) => void,
    onSuccess?: (rawResponse?: any) => void
}

const decodeResponse = (params: DecodeResponseParams) => {
    const onError = params.onError || function (rawResponse: any) { console.error(`Failed on ${JSON.stringify(rawResponse)}`) }
    const onSuccess = params.onSuccess || function (rawResponse: any) { console.log(`Succeeded on ${JSON.stringify(rawResponse)}`) }

    return pipe(params.codec.decode(params.rawResponse), fold(onError, onSuccess))
}

const fakeUserAPIResponses = [
    {
        name: 'bob',
        userId: 123
    },
    {
        userId: 456
    },
    {
        name: 'steve',
    },
    {
        asasdad: 'asddqwdqw'
    }
]

const main = () => {
    fakeUserAPIResponses.forEach(rawResponse => {
        decodeResponse({
            codec: UserCodec,
            rawResponse: rawResponse
        })
    })
}

export default main