const { contextBridge } = require('electron')
const ipc = require('node-ipc').default
const mitt = require('mitt')

const emitter = mitt()

ipc.config.silent = true

contextBridge.exposeInMainWorld('lib', {
  emitter
})

ipc.connectTo('revealer', function () {
  ipc.of.revealer.on('data', function (data) {
    emitter.emit('data', data)
  })
})
