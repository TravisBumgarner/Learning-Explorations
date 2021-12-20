require('dotenv').config()

const { process_params } = require('express/lib/router');
const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/820935989716/${process.env.AWS_SQS_QUEUE_NAME}`,
  handleMessage: async (message) => {
    console.log(message)
  }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();