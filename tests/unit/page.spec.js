import {
  mount
} from '@vue/test-utils'
import {
  createTestingPinia
} from '@pinia/testing'

import Page from '@/components/Page.vue'

const WINDOW_HEIGHT = 1200
const WINDOW_WIDTH = 1024

let wrapper

describe('Page.vue', () => {
  describe('given a page with no slides', () => {
    beforeEach(() => {
      wrapper = factoryWithPinia()
    })

    it("should match the page's height to the window's height", () => {
      expect(wrapper.vm.pageStyle.height).toBe(`${WINDOW_HEIGHT}px`)
    })

    it("should match the page's width to the window's width", () => {
      expect(wrapper.vm.pageStyle.width).toBe(`${WINDOW_WIDTH}px`)
    })
  })

  describe('given a page with ONE slide', () => {

  })

  describe('given a page with TWO slides', () => {

  })

  describe('given a first page with TWO slides and a second page with TWO slides', () => {

  })
})

const factoryWithPinia = (options) => {
  return mount(Page, {
    ...options,
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia({
        initialState: {
          viewport: {
            _height: WINDOW_HEIGHT,
            _width: WINDOW_WIDTH
          }
        },
        stubActions: false
      })]
    }
  })
}
