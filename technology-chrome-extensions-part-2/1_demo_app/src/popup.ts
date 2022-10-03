import { Action } from './types'

const action = (type: Action) => {
  chrome.runtime.sendMessage({
    type,
  });
}

document.getElementById('record').addEventListener('click', () => action(Action.StartRecording))
document.getElementById('stop').addEventListener('click', () => action(Action.StopRecording))
