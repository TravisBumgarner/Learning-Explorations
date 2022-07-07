import { DiscordRequest } from './utils.js';

async function HasGuildCommand(appId, guildId, command) {
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
    console.log('command', command)
    try {
        const res = await DiscordRequest(endpoint, { method: 'GET' });
        const data = await res.json();

        if (data) {
            const installedNames = data.map((c) => c['name']);

            if (!installedNames.includes(command['name'])) {
                console.log(`Installing "${command['name']}"`);
                InstallGuildCommand(appId, guildId, command);
            } else {
                console.log(`"${command['name']}" command already installed`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}

export async function HasGuildCommands(appId, guildId, commands) {
    if (guildId === '' || appId === '') return;

    commands.forEach((c) => HasGuildCommand(appId, guildId, c));
}

// Installing a Command takes the metadata below for TEST_COMMAND and saves it in Discord.
export async function InstallGuildCommand(appId, guildId, command) {
    const endpoint = `applications/${appId}/guilds/${guildId}/commands`;
    try {
        await DiscordRequest(endpoint, { method: 'POST', body: command });
    } catch (err) {
        console.error(err);
    }
}

export const TEST_COMMAND = {
    name: 'test2',
    description: 'Basic guild command2',
    type: 1,
};

