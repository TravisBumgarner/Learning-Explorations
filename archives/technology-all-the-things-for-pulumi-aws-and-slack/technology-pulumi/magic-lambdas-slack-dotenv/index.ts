
import * as aws from "@pulumi/aws";
import axios from 'axios'

import config from './config'

const docsBucket = new aws.s3.Bucket("magic-lambdas");

docsBucket.onObjectCreated("docsHandler", (e) => {
    axios.post(
        config.webhookSlackURL,
        {
            "text": JSON.stringify(e)
        }
    )
});

/*
Output ->

{
    "Records": [
        {
            "eventVersion": "2.1",
            "eventSource": "aws:s3",
            "awsRegion": "us-east-1",
            "eventTime": "2022-08-08T21:03:03.144Z",
            "eventName": "ObjectCreated:Put",
            "userIdentity": {
                "principalId": "id"
            },
            "requestParameters": {
                "sourceIPAddress": "ip.ip.ip"
            },
            "responseElements": {
                "x-amz-request-id": "id",
                "x-amz-id-2": "id2"
            },
            "s3": {
                "s3SchemaVersion": "1.0",
                "configurationId": "id",
                "bucket": {
                    "name": "magic-lambdas-abc123",
                    "ownerIdentity": {
                        "principalId": "id"
                    },
                    "arn": "arn:aws:s3:::magic-lambdas-abc123"
                },
                "object": {
                    "key": "2022-08-03+10.00.58.jpg",
                    "size": 4684648,
                    "eTag": "dead-beaf",
                    "sequencer": "12345"
                }
            }
        }
    ]
}
*/