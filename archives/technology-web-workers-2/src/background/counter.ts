import { liveQuery, Observable, Subscription } from 'dexie';
import { db, Entry } from '../db'

// Next steps
// on startup - get all to upload
// subscribe - try and upload

const fakeDelay = (durationMS: number) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve('success');
        }, durationMS)
    });
}

const entriesObservable = liveQuery(
    // can't index booleans. 
    () => db.entries.where('status').equals('unuploaded').limit(1).first()
);

let subscription: Subscription

const init = () => {
    const subscription = entriesObservable.subscribe({
        next: (async entry => {
            if (!(entry === undefined)) {
                console.log('new entry to upload', entry)
                await fakeDelay(5000)
                await db.entries.where({ id: entry.id }).modify({ ...entry, status: "uploaded" })
                console.log('done')
            }
        }),
        error: error => console.error(error)
    });
}

const cleanup = () => subscription.unsubscribe()

self.onmessage = (e: MessageEvent<string>) => {
    console.log(e.data)
    if (e.data === 'init') init()
    if (e.data === 'cleanup') cleanup()
}
export { };