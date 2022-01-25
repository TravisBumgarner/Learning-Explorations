function wait_eventstore_db() {
    sleep 1
    while true; do
        if docker-compose ps | egrep 'eventstore.+Exit'
        then
            echo "EventStoreDB failed to startup, see log."
            exit 1
        elif docker-compose ps | egrep 'eventstore.*Up \(health: starting\)'
        then
            echo "EventStoreDB Starting"
        elif docker-compose ps | egrep 'eventstore.*Up \(healthy\)'
        then
            echo "EventStoreDB Running"
            break
        fi
        sleep 1
    done
}


docker-compose --env-file .env.testing up -d
wait_eventstore_db
./node_modules/jest/bin/jest.js --config=jest.integration.js
docker-compose stop eventstore.db