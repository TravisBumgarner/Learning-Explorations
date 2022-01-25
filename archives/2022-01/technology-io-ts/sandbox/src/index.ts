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

const fetchFakeData = (index: number) => {
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

    return fakeUserAPIResponses[index] // Change this to try error state of data
}

const insertIntoFakeDB = (user: UserCodec) => {
    console.log('inserting into DB', JSON.stringify(user))
}

const main = () => {
    const fakeResponse = fetchFakeData(0)
    decodeResponse({
        codec: userCodec,
        rawResponse: fakeResponse,
        onError: (e) => console.log('boo error'),
        onSuccess: (data) => { insertIntoFakeDB(data) }
    })
}

export default main