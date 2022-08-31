import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import 

const example = new aws.secretsmanager.Secret("SlackWebhookUrl", {
    description: "Webhook URL used for Slack"
});

const sendTopicToSlack = (topic: string) => {
    axios.post(
        slackWebhookUrl,
        {
            text: `New Topic: ${topic}`
        },
        {
            headers: {
                "content-type": "application/json"
            }
        }
    )
}