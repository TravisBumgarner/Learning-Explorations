import { createClient } from 'redis';

const get = async () => {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('key', 'value');
    const value = await client.get('key');
    return value
}

export {
    get
}