import { createClient } from 'redis';

const publish = async (topic: string, message: string) => {
    const publisher = await createClient()
    await publisher.connect();

    await publisher.publish(topic, message);
    publisher.quit()
}

export default publish