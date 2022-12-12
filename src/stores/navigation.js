import {
  defineStore
} from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    events: [],
    pages: {}
  }),
  getters: {
    activePageIndex: (state) => {
      if (state.pageCount === 0) return null

      const pageStringIndexes = Object.keys(state.pages)
      const pageIntegerIndexes = pageStringIndexes.map((stringIndex) => parseInt(stringIndex))

      return pageIntegerIndexes.find((pageIndex) => state.pages[pageIndex].active)
    },
    eventCount: (state) => state.events.length,
    lastEvent: (state) => state.events[state.events.length - 1],
    pageCount: (state) => Object.keys(state.pages).length
  },
  actions: {
    addPageEvent (direction, fromPageIndex, toPageIndex) {
      this.events.push({
        direction,
        fromPageIndex,
        toPageIndex
      })

      this.pages[fromPageIndex].active = false
      this.pages[toPageIndex].active = true
    },
    registerPage (instance) {
      const { pageCount } = this
      const newPageIndex = pageCount === null ? 0 : pageCount

      const isFirstPage = newPageIndex === 0
      const newPage = { instance, active: isFirstPage }

      this.pages[newPageIndex] = newPage

      return newPageIndex
    },
    reset () {
      this.events = []
      this.pages = {}
    }
  }
})
