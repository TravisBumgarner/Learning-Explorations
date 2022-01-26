FILE=".env"

if (( $# == 1 ))
then
    FILE=".env.$1"
fi

echo "Env file: $FILE"

function wait_eventstore_db() {
    sleep 1
    while true; do
        if docker-compose --env-file $FILE ps | egrep 'eventstore.+Exit'
        then
            echo "EventStoreDB failed to startup, see log."
            exit 1
        elif docker-compose --env-file $FILE ps | egrep 'eventstore.*Up \(health: starting\)'
        then
            echo "EventStoreDB Starting"
        elif docker-compose --env-file $FILE ps | egrep 'eventstore.*Up \(healthy\)'
        then
            echo "EventStoreDB Running"
            break
        fi
        sleep 1
    done
}

docker-compose --env-file $FILE up -d
wait_eventstore_db
./node_modules/jest/bin/jest.js --config=jest.integration.js --detectOpenHandles
docker-compose --env-file $FILE stop eventstore.db