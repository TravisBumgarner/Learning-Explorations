import * as t from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import { string } from 'fp-ts'

const userCodec = t.type({
    userId: t.number,
    name: t.string
})
type UserCodec = t.TypeOf<typeof userCodec>

type DecodeResponseParams = {
    codec: t.TypeC<any>,
    rawResponse: any,
    onError: (e: Array<t.ValidationError>) => (void | undefined),
    onSuccess: (parsedResponse: t.TypeC<any>) => (void | undefined)
}

const decodeResponse = (params: DecodeResponseParams) => {
    const onError = params.onError
    const onSuccess = params.onSuccess

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
            codec: userCodec,
            rawResponse: rawResponse,
            onError: (e) => console.log('boo error'),
            onSuccess: (data) => { console.log('woo data' + JSON.stringify(data)) }
        })
    })
}

export default main