import 'dotenv/config';
import axios from 'axios'

/*
Open Discord App
Open Settings -> Integrations -> Webhooks
Create one, copy URL, put in .env

https://discord.com/developers/docs/resources/webhook

There's not really much more to webhooks than this. 
It is possible to reply to a specific thread_id which might be useful in authing a user. 
*/

const main = async () => {
    const body = {
        content: "Foo bar."
    }

    const response = await axios.post(process.env.DISCORD_WEBHOOK_URL, body)
    console.log(response)
}

main()