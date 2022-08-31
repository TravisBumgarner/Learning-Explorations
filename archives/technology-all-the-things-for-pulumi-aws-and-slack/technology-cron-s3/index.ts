import * as aws from "@pulumi/aws";
import { ObjectIdentifier } from "aws-sdk/clients/s3";

// Create an AWS resource (S3 Bucket)
const trashBucket = new aws.s3.Bucket("trash");

// A handler function that will list objects in the bucket and bulk delete them
const emptyTrash: aws.cloudwatch.EventRuleEventHandler = async (
    event: aws.cloudwatch.EventRuleEvent
) => {
    const s3Client = new aws.sdk.S3(); //creates interface to service
    const bucket = trashBucket.id.get();

    const { Contents = [] } = await s3Client //get list of objects in bucket
        .listObjects({ Bucket: bucket })
        .promise();
    const objects: ObjectIdentifier[] = Contents.map(object => {
        return { Key: object.Key! };
    });

    await s3Client //delete objects
        .deleteObjects({
            Bucket: bucket,
            Delete: { Objects: objects, Quiet: false }
        })
        .promise()
        .catch((error: any) => console.log(error));
    console.log(
        `Deleted ${Contents.length} item${Contents.length === 1 ? "" : "s"
        } from ${bucket}.`
    );
};

// Schedule the function to run every Friday at 11:00pm UTC (6:00pm EST)
// More info on Schedule Expressions at
// https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html
const emptyTrashSchedule: aws.cloudwatch.EventRuleEventSubscription = aws.cloudwatch.onSchedule(
    "emptyTrash",
    "rate(2 minutes)",
    emptyTrash
);
// Export the name of the bucket
export const bucketName = trashBucket.id;