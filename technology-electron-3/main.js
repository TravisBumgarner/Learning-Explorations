const path = require('path')

const { app, BrowserWindow, ipcMain } = require('electron')


const createWindow = ({ x, y, width, height, file, preload }) => {
    const win = new BrowserWindow({
        width,
        height,
        x,
        y,
        webPreferences: {
            preload,
        },
    })
    ipcMain.handle('ping', () => 'pong')
    win.loadFile(file)
}

app.whenReady().then(() => {
    createWindow({
        width: 500,
        height: 500,
        x: 0,
        y: 0,
        file: path.join(__dirname, 'frontend/index.html'),
        preload: path.join(__dirname, 'frontend/preload.js')
    })
})