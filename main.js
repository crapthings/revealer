const { fork } = require('child_process')
const path = require('path')

const { app, BrowserWindow } = require('electron')

// app.disableHardwareAcceleration()

app
  .whenReady()
  .then(createWindow)

app.on('window-all-closed', onClose)

app.on('activate', onActivate)

function createWindow () {
  const App = new BrowserWindow({
    title: 'Revealer',
    width: 1280,
    height: 720,
    frame: false,
    resizable: false,
    // roundedCorners: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.NODE_ENV === 'production') {
    App.loadFile('./app/index.html')
  } else {
    App.loadURL('http://localhost:8080')
  }

  App.setWindowButtonVisibility(false)

  App.webContents.openDevTools({ mode: 'detach' })

  fork(__dirname + '/si.js')
}

function onClose () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

function onActivate () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}
