# Notes

Running Eventstore with Docker: https://developers.eventstore.com/server/v20.10/installation/docker.html#run-with-docker
- Note: Had to change image to `image: ghcr.io/eventstore/eventstore:21.10.0-alpha-arm64v8` for Mac M1
https://developers.eventstore.com/clients/dotnet/5.0/connecting.html#eventstoreconnection
https://developers.eventstore.com/clients/grpc/reading-events.html#reading-from-a-revision

# Setup

1. docker-compose up -d to launch EventStore
2. Run `./src/write.js` to write to event stream
3. Run `./src/read.js` to read from event stream.

Events are written and read once per second. 