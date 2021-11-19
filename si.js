const ipc = require('node-ipc').default
const si = require('systeminformation')

ipc.config.id = 'revealer'
ipc.config.silent = true

ipc.serve(function () {
  si.observe({
    cpuTemperature: '*',
    currentLoad: '*',
    cpu: '*',
    osInfo: '*',
    mem: '*',
  }, 1000, (data) => {
    ipc.server.broadcast('data', data)
  })
})

ipc.server.start()
