import Dexie, { Table } from 'dexie'
import { v4 as uuidv4 } from 'uuid'

import {
    Message
} from '../../shared/types'

import { Action } from './types'

let tabIdToRecord: string | null
let recordingIntervalId: NodeJS.Timeout | null = null
var mediaRecorder = '';
var width = 1920;
var height = 1080;
var fps = 60;

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
    let counter = 0
    recordingIntervalId = setInterval(() => {
        chrome.action.setBadgeText({ text: `${counter}` })
        counter += 1
    }, 1000)

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

    clearInterval(recordingIntervalId)

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
    // chrome.tabs.query({ currentWindow: true }, function (tab) {
    chrome.tabs.getCurrent(function (tab) {
        console.log(chrome.tabCapture)
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
    })
}

chrome.runtime.onMessageExternal.addListener(
    function (request: Message, sender, sendResponse) {

        if (sender.origin !== "http://localhost:3000") {
            sendResponse("Nahh")
            return
        }
        console.log(sender)
        // tabIdToRecord = sender.tab.id

        switch (request.type) {
            case "START_RECORDING": {
                console.log("Starting recording")
                startRecording()
                break
            }
            case "STOP_RECORDING": {
                console.log("Stopping recording")
                stopRecording()
                break
            }
        }

        sendResponse('hello from background')
    });


// function getTab() {
//     chrome.tabs.query(null, function (tab) {
//         chrome.tabCapture.capture({
//             video: true,
//             audio: true,
//             videoConstraints: {
//                 mandatory: {
//                     chromeMediaSource: 'tab',
//                     minWidth: width,
//                     minHeight: height,
//                     maxWidth: width,
//                     maxHeight: height,
//                     maxFrameRate: fps
//                 },
//             },
//         }, function (stream) {
//             // Combine tab and microphone audio
//             const output = new MediaStream();

//             // Set up media recorder & inject content
//             newRecording(output)

//             // Hide the downloads shelf
//             chrome.downloads.setShelfEnabled(false);

//             // This will write the stream to the filesystem asynchronously
//             const { readable, writable } = new TransformStream({
//                 transform: (chunk, ctrl) => chunk.arrayBuffer().then(b => ctrl.enqueue(new Uint8Array(b)))
//             })
//             const writer = writable.getWriter()
//             readable.pipeTo(streamSaver.createWriteStream('screenity.webm'));

//             // Record tab stream
//             var recordedBlobs = [];
//             mediaRecorder.ondataavailable = event => {
//                 if (event.data && event.data.size > 0) {
//                     writer.write(event.data);
//                     recordedBlobs.push(event.data);
//                 }
//             };

//             // When the recording is stopped
//             mediaRecorder.onstop = () => {
//                 endRecording(stream, writer, recordedBlobs);
//             }

//             // Stop recording if stream is ended when tab is closed
//             stream.getVideoTracks()[0].onended = function () {
//                 mediaRecorder.stop();
//             }
//         });
//     });
// }