import * as t from 'io-ts'
import { pipe } from 'fp-ts/function'
import { fold } from 'fp-ts/Either'
import { string } from 'fp-ts'

const userCodec = t.type({
    userId: t.number,
    name: t.string
})
type UserCodec = t.TypeOf<typeof userCodec>

type DecodeResponseParams<T> = {
    codec: T,
    rawResponse: any,
    onError: (e: Array<t.ValidationError>) => (void | undefined),
    onSuccess: (parsedResponse: T) => (void | undefined)
}

const decodeResponse = (params: DecodeResponseParams<t.TypeC<any>>) => {
    return pipe(params.codec.decode(params.rawResponse), fold(params.onError, params.onSuccess))
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

    return fakeUserAPIResponses[index]
}

const insertIntoFakeDB = (user: UserCodec) => {
    console.log('inserting into DB', JSON.stringify(user))
}

const main = () => {
    const fakeResponse = fetchFakeData(0) // Change this to try error state of data
    decodeResponse({
        codec: userCodec,
        rawResponse: fakeResponse,
        onError: (e) => console.log('boo error'),
        onSuccess: (data) => insertIntoFakeDB(data as unknown as UserCodec) // This be bad
    })
}

export default main