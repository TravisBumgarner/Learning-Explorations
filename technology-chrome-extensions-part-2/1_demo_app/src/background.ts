import Dexie, { Table } from 'dexie'
import { v4 as uuidv4 } from 'uuid'

import { Action } from './types'

type TRecording = {
    id: string
    file: Blob
    name: string
}
class MySubClassedDexie extends Dexie {
    videos!: Table<TRecording>

    constructor() {
        super('recordings')
        this.version(1).stores({
            videos: '[id]',
        })
    }
}

type RecordingGlobals = {
    mediaRecorder: MediaRecorder | null,
    mediaChunks: Blob[],
    mediaStream: MediaStream | null,
}

const recordingGlobals: RecordingGlobals = {
    mediaRecorder: null,
    mediaChunks: [],
    mediaStream: null,
}

const db = new MySubClassedDexie()

const record = (stream: MediaStream) => {
    recordingGlobals.mediaStream = stream
    recordingGlobals.mediaRecorder = new MediaRecorder(stream);
    recordingGlobals.mediaRecorder.ondataavailable = ({ data }) => recordingGlobals.mediaChunks.push(data);
    recordingGlobals.mediaRecorder.start();
    chrome.action.setBadgeText({ text: 'Rec' })
}

const stopRecording = () => {
    const blob = new Blob(recordingGlobals.mediaChunks);
    recordingGlobals.mediaRecorder.stop();
    recordingGlobals.mediaStream && recordingGlobals.mediaStream.getTracks().forEach((track) => track.stop());
    recordingGlobals.mediaChunks = [];

    recordingGlobals.mediaStream.getTracks().forEach(track => track.stop())
    chrome.action.setBadgeText({ text: 'done' })
    db.videos.add({
        id: uuidv4(),
        file: blob,
        name: uuidv4(),
    }).then(() => {
        console.log('added to db')
    })
};

const startRecording = () => {
    chrome.tabCapture.capture({
        video: true, audio: true,
        videoConstraints: {
            mandatory: {
                minWidth: 16,
                minHeight: 9,
                maxWidth: 854,
                maxHeight: 480,
                maxFrameRate: 60,  // 0 ~ 60
            },
        },
    },
        record
    )
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('message received')
    console.log(request)

    switch (request.type as Action) {
        case Action.StartRecording: {
            startRecording()
            break
        }

        case Action.StopRecording: {
            stopRecording()
            break
        }
    }
    sendResponse();
});