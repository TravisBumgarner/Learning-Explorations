# Resources

https://www.sohamkamani.com/nodejs/working-with-kafka/
https://kafka.apache.org/quickstart

# Setup

### Frontend

1. `cd frontend && npm i`
2. `npm run sd:fe`

### Backend

1. `cd backend && npm i`
2. `npm run sd:be`

### Kafka Server

1. [Follow these instructions](https://kafka.apache.org/quickstart), specifically Steps 1 and 2 to start Zookeeper and Kafka.
### Kafka Consumer

1. `cd backend` (`npm i` if you didn't already)
2. `npm run sd:kafka-consumer`


# Architecture

### Creating a Click event

1. User clicks `red`, `green`, or `blue`
2. ButtonClick is sent to express server
3. Express server uses kafka service to write message to topic.
4. Kafka Consumer (see above) receives message and upserts it into database

### Reading all click events

1. On page load express does a sql query to get all presses
2. UI loads all presses ... eventually. 