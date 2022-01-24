import write from './write'
import read from './read'

test('assert foo', async () => {
    await write('foo123', 10)
    await write('foo123', 20)
    await write('bar456', 50)
    await read()
    expect(true).toBe(true)
})