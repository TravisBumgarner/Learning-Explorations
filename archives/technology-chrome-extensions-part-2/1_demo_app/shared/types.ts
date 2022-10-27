type StartRecording = {
    type: "START_RECORDING"
}

type StopRecording = {
    type: "STOP_RECORDING"
}

type Message =
    | StartRecording
    | StopRecording

export {
    Message
}