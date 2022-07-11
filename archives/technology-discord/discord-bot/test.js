//

import 'dotenv/config';
import fetch from 'node-fetch';
import { verifyKey } from 'discord-interactions';

export async function DiscordRequest(endpoint, options) {
    const url = 'https://discord.com/api/v10/' + endpoint;

    if (options.body) options.body = JSON.stringify(options.body);

    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
        },
        ...options
    });

    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }

    return res;
}

const main = async () => {
    const endpoint = `invites/foo`;
    try {
        await DiscordRequest(endpoint, { method: 'GET' });
    } catch (err) {
        console.error(err);
    }
}

main()