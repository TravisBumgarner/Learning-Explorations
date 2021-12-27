import { createClient } from 'redis';

const subscribe = async (topic: string) => {
    const subscriber = await createClient()
    await subscriber.connect();

    await subscriber.subscribe(topic, (message) => {
        console.log(message); // 'message'
    });

}

export default subscribe