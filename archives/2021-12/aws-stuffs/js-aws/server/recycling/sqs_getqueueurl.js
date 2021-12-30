require('dotenv').config()
// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: process.env.AWS_REGION });

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: process.env.AWS_SQS_API_VERSION  });

var params = {
  QueueName: process.env.AWS_SQS_QUEUE_URL,
};

sqs.getQueueUrl(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.QueueUrl);
  }
});
