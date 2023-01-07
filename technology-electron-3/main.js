const path = require('path')

const { app, BrowserWindow, ipcMain } = require('electron')


const createWindow = ({ x, y, width, height, file }) => {
    const win = new BrowserWindow({
        width,
        height,
        x,
        y,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow({ width: 500, height: 500, x: 0, y: 0, file: 'index.html' })
})