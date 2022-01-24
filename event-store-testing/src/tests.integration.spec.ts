import write from './write'
import read from './read'

const testData = [
    {
        events: [
            { sku: 'foo123', quantity: 10 },
            { sku: 'bar456', quantity: 20 },
            { sku: 'bar456', quantity: -10 },
            { sku: 'foo123', quantity: 20 },
            { sku: 'foo123', quantity: 50 },
        ],
        expectedResult: {
            'foo123': 80,
            'bar456': 10
        }
    }
]

testData.forEach(async ({ events, expectedResult }) => {
    for (let event of events) {
        await write(event.sku, event.quantity)
    }
    const actualResult = await read()

    expect(actualResult).toEqual(expectedResult)
})