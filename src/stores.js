import create from 'zustand'

const stores = create((set) => ({
  data: null,

  getData: () => {
    window.lib.emitter.on('data', (data) => {
      set(() => ({ data }))
    })
  },
}))

export default stores
