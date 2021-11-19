const { contextBridge } = require('electron')
const si = require('systeminformation')

contextBridge.exposeInMainWorld('api', {
  getStaticData () {
    return new Promise(function (resolve) {
      si.getStaticData(resolve)
    })
  },

  getWifiConnections () {
    return si.wifiConnections()
  },

  getNetworkStats () {
    return si.wifiConnections()
  },

  getCpu () {
    return si.cpu()
  },

  getCpuTemperature () {
    return si.cpuTemperature()
  },

  getCpuCurrentLoad () {
    return si.currentLoad()
  },

  getMem () {
    return si.mem()
  },

  getOsInfo () {
    return si.osInfo()
  }
})
