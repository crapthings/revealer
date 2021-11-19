import create from 'zustand'

const stores = create((set) => ({
  staticData: null,

  getStaticData: () => {
    window.api.getStaticData().then((staticData) => {
      set(() => ({ staticData }))
    })
  },

  wifiConnections: null,

  getWifiConnections: () => {
    window.api.getWifiConnections().then((wifiConnections) => {
      set(() => ({ wifiConnections }))
    })
  },

  cpu: null,

  getCpu: () => {
    window.api.getCpu().then((cpu) => {
      set(() => ({ cpu }))
    })
  },

  cpuTemperature: null,

  getCpuTemperature: () => {
    window.api.getCpu().then((cpuTemperature) => {
      set(() => ({ cpuTemperature }))
    })
  },

  cpuCurrentLoad: null,

  getCpuCurrentLoad: () => {
    window.api.getCpuCurrentLoad().then((cpuCurrentLoad) => {
      set(() => ({ cpuCurrentLoad }))
    })
  },

  mem: null,

  getMem: () => {
    window.api.getMem().then((mem) => {
      set(() => ({ mem }))
    })
  },

  osInfo: null,

  getOsInfo () {
    window.api.getOsInfo().then((osInfo) => {
      set(() => ({ osInfo }))
    })
  }
}))

export default stores
