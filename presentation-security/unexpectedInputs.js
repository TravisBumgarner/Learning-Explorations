function checkTimestamp(timestamp) {
  var currentTime = new Date().getTime();
  var timeDifference = (currentTime - timestamp) / 1000;
  if (timeDifference > 10) {
    throw new Error("Timestamp is not within the last 10 seconds");
  }
}

const gqlResolver = (payload) => {
  checkTimestamp(payload.timestamp)

  publishEvent(payload)
}
