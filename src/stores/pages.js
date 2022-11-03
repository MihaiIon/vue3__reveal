import {
  defineStore
} from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => ({
    pages: []
  }),
  getters: {
    count: (state) => state.pages.length,
    getPageById: (state) => {
      return (id) => state.pages.find((page) => page.id === id)
    }
  },
  actions: {
    registerPageById (pageId) {
      this.pages.push({
        id: pageId,
        currentSlideIndex: 0
      })
    },
    clear () {
      this.pages = []
    }
  }
})
