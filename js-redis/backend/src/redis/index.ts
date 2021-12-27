import { createClient } from 'redis';

const connect = async () => {
    const client = createClient();
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();

    return client
}

const set = async (key: string, value: string) => {
    const client = await connect()
    await client.set(key, value)
}

const get = async (key: string) => {
    const client = await connect()

    const value = await client.get(key);
    return value
}

export {
    get,
    set,
    connect
}