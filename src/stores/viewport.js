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
    updateHeightAndWidth (height, width) {
      this._height = height
      this._width = width
    }
  }
})
