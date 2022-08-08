import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import {existsSync} from 'fs'

if(!existsSync('dist')) throw new Error("Bundle app first")

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html",
    },
});

// Export the name of the bucket
export const bucketName = bucket.id;

const bucketObjectHTML = new aws.s3.BucketObject("index.html", {
    acl: "public-read",
    contentType: "text/html",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("dist/index.html")
});

const bucketObjectJS = new aws.s3.BucketObject("app.bundle.js", {
    acl: "public-read",
    contentType: "text/javascript",
    bucket: bucket,
    source: new pulumi.asset.FileAsset("dist/app.bundle.js")
});

export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`
