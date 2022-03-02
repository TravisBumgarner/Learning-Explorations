import { InventoryEvent } from './types'
import { summarizeData } from './read'

const testData = [
    {
        events: [
            { data: { sku: 'foo123', quantity: 10 } },
            { data: { sku: 'bar456', quantity: 20 } },
            { data: { sku: 'bar456', quantity: -10 } },
            { data: { sku: 'foo123', quantity: 20 } },
            { data: { sku: 'foo123', quantity: 50 } },
        ] as InventoryEvent[],
        expectedResult: {
            'foo123': 80,
            'bar456': 10
        }
    }
]

test('summarizeData summarizes data', () => {
    testData.forEach(({ events, expectedResult }) => {
        const actualResult = summarizeData(events)
        console.log(expectedResult, actualResult)
        expect(actualResult).toEqual(expectedResult)
    })
})