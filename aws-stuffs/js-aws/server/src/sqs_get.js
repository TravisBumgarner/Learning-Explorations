require('dotenv').config()

const { process_params } = require('express/lib/router');
const { Consumer } = require('sqs-consumer');

const db = require('./db')

const app = Consumer.create({
  queueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/820935989716/${process.env.AWS_SQS_QUEUE_NAME}`,
  handleMessage: async (message) => {
    db.insert({ body: message.Body, id: message.MessageId })
    console.log('Message', message.Body)
    console.log('Author', message.MessageAttributes.Author.StringValue)
    console.log('Title', message.MessageAttributes.Title.StringValue)
    console.log('Created', message.Attributes.SentTimestamp)
  },
  attributeNames: ['All'],
  messageAttributeNames: ['All'] 
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();