import { defineStore } from 'pinia'

export const usePagesStore = defineStore('pages', {
  state: () => ({ pages: [] }),
  getters: {
    count: (state) => state.pages.length,
    getPageById: (state) => {
      return (id) => state.pages.find((page) => page.id === id)
    }
  },
  actions: {
    registerPageById(pageId) {
      this.pages.push({ id: pageId, currentSlideIndex: 0 })
    }
  }
})

export const useNavigationEventsStore = defineStore('navigationEvents', {
  state: () => ({ events: [] }),
  getters: {
    count: (state) => state.events.length,
    lastEvent: (state) => state.events[state.events.length - 1]
  },
  actions: {
    addPageEvent(direction, fromPageIndex, toPageIndex) {
      this.events.push({ direction, fromPageIndex, toPageIndex })
    }
  }
})
