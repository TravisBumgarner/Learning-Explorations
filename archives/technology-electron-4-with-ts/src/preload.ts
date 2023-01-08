import { contextBridge, ipcRenderer } from 'electron'

// Unclear why the following line is mad.
import { Foobar } from './types' //eslint-disable-line 

contextBridge.exposeInMainWorld('foobar', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),
    // we can also expose variables, not just functions
} as Foobar)