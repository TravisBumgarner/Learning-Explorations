import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

const STACK = pulumi.getStack();

// Create an AWS resource (S3 Bucket)
const fromBucket = new aws.s3.Bucket("bucket-insecure");
const toBucket = new aws.s3.Bucket("bucket-secure");

// const lambdaFunction = async (event: any) => {
//     const AWS = require('aws-sdk')
//     const s3 = new AWS.S3()
//     // decode the body of the event
//     const payloadBuffer = new Buffer(event.body, 'base64')
//     const payload = payloadBuffer.toString('ascii')
//     const putParams = {
//         Bucket: process.env.S3_BUCKET, // We'll read the .env variable
//         Key: `${new Date().getTime()}.json`, // We'll use the timestamp
//         Body: payload
//     }

//     await new Promise((resolve, reject) => {
//         s3.putObject(putParams, function (err: any, data: any) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data)
//             }
//         })
//     })
//     return {
//         statusCode: 200,
//         body: "Success"
//     }
// }

// const lambdaRole = new aws.iam.Role(`role-payloads-api`, {
//     assumeRolePolicy: {
//         "Version": "2012-10-17",
//         "Statement": [
//             {
//                 "Action": "sts:AssumeRole",
//                 "Principal": {
//                     "Service": "lambda.amazonaws.com"
//                 },
//                 "Effect": "Allow"
//             }
//         ]
//     },
// })

// const lambdaS3Policy = new aws.iam.Policy(`post-to-s3-policy`, {
//     description: "IAM policy for Lambda to interact with S3",
//     path: "/",
//     policy: fromBucket.arn.apply(bucketArn => `{
//     "Version": "2012-10-17",
//     "Statement": [
//       {
//         "Action": "s3:PutObject",
//         "Resource": "${bucketArn}/*",
//         "Effect": "Allow"
//       }
//     ]}`)
// })

// // Attach the policies to the Lambda role
// new aws.iam.RolePolicyAttachment(`post-to-s3-policy-attachment`, {
//     policyArn: lambdaS3Policy.arn,
//     role: lambdaRole.name
// })

// const lambda = new aws.lambda.CallbackFunction(`payloads-api-meetup-lambda`, {
//     name: `payloads-api-meetup-lambda-${STACK}`,
//     runtime: "nodejs16.x",
//     role: lambdaRole,
//     callback: lambdaFunction,
//     environment: {
//         variables: {
//             S3_BUCKET: fromBucket.id
//         }
//     }
// })
// // Create our API
// let apiGateway = new awsx.apigateway.API(`payloads-api-meetup-api-gateway`, {
//     routes: [
//         {
//             path: "/post_to_s3",
//             method: "POST",
//             eventHandler: lambda
//         }
//     ]
// })
// // Let's spit out what the URL is:
// exports.apiGateway = apiGateway.url
// exports.bucketName = fromBucket.id;