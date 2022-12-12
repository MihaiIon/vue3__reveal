import {
  defineStore
} from 'pinia'

export const useViewportStore = defineStore('viewport', {
  state: () => ({
    _height: 0,
    _width: 0
  }),
  getters: {
    height: (state) => state._height,
    width: (state) => state._width
  },
  actions: {
    // updateHeight (height) {
    //   this.height = height
    // },
    updateWidth (width) {
      this._width = width
    }
  }
})
