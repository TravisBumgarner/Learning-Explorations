Connect a web worker to indexeddb.

Notes
- Can't index boolean in indexdb - https://stackoverflow.com/questions/53060324/using-a-field-with-a-boolean-type-in-dexie-js
- Need to hard reload for webworker code to update. Or use some other method which I haven't found yet.