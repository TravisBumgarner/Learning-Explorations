import { Boolean, Number, String, Record, Runtype, Static } from 'runtypes';

const userRunType = Record({
    userId: Number,
    name: String
})

type User = Static<typeof userRunType>

type Success<T> = {
    success: true,
    data: T
}

type Failure = {
    success: false,
}

const checkTypes = <T>(runtype: Runtype<T>, rawResponse: any): (Failure | Success<T>) => {
    try {
        const parsedResponse = runtype.check(rawResponse)
        return {
            success: true,
            data: parsedResponse
        }
    } catch (error) {
        console.log(error)
        return {
            success: false
        }
    }
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

const insertIntoFakeDB = (user: User) => {
    console.log('inserting into DB', JSON.stringify(user))
}

const main = () => {
    const fakeResponse = fetchFakeData(0)
    const result = checkTypes(userRunType, fakeResponse)
    if (result.success) insertIntoFakeDB(result.data)
}

export default main