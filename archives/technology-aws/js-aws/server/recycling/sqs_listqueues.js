require('dotenv').config()

//docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sqs-examples-using-queues.html

// Load the AWS SDK for Node.js
https: var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: process.env.AWS_REGION });

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: process.env.AWS_SQS_API_VERSION });

var params = {};

sqs.listQueues(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrls);
  }
});
