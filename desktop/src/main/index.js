'use strict'

import { app, BrowserWindow } from 'electron'
import log from 'electron-log'
import { execFile } from 'child_process'
import path from 'path'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// Backend
let go

function createWindow () {
  log.info('Starting')
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 1080,
    useContentSize: true,
    width: 1920
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function startBackend () {
  if (process.env.NODE_ENV === 'development') {
    log.info('Running in DEV mode')
    log.warn('In DEV mode the backend has to be started manually.')
  } else {
    log.info('Running in PROD mode')
    // Starting the "backend"
    go = execFile(path.join(__dirname, '../../../scany-server'), (error, stdout, stderr) => {
      if (error) {
        throw error
      }
      log.info(stdout)
    })
  }
}

function init () {
  // Setting up logging
  log.transports.file.level = 'info'

  startBackend()
  createWindow()
}

app.on('ready', init)

app.on('window-all-closed', () => {
  go.kill()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
