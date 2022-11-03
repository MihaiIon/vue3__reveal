import {
  defineStore
} from 'pinia'

export const useClientDimensionsStore = defineStore('clientDimensions', {
  state: () => ({
    dimensions: { height: 0, width: 0 }
  }),
  getters: {
    height: (state) => state.dimensions.height,
    width: (state) => state.dimensions.width
  },
  actions: {
    setHeight (height) {
      this.dimensions.height = height
    },
    setWidth (width) {
      this.dimensions.width = width
    }
  }
})
