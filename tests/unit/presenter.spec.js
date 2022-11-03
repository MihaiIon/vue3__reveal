import {
  mount
} from '@vue/test-utils'
import {
  createTestingPinia
} from '@pinia/testing'

import Component from '@/components/Presenter.vue'
import Page from '@/components/Page.vue'

import {
  usePagesStore,
  useNavigationEventsStore
} from '@/stores/navigation'
import {
  DIRECTION,
  KEY_CODE
} from '@/utils/constants'

let wrapper

describe('Presenter.vue', () => {
  describe('given no pages', () => {
    beforeEach(() => {
      factoryWithPinia()
    })

    it('should not update the navigation state', () => {
      const pages = usePagesStore()

      expect(pages.count).toBe(0)
    })

    describe('when pressing the LEFT arrow', () => {
      it('should not send a navigation event', () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForLeftArrow()

        expect(navigationEvents.count).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should not send a navigation event', () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForRightArrow()

        expect(navigationEvents.count).toBe(0)
      })
    })
  })

  describe('given ONE page', () => {
    beforeEach(() => {
      wrapper = factoryWithPinia({
        slots: {
          default: Page
        }
      })
    })

    it('should register the page', () => {
      const pages = usePagesStore()

      expect(pages.count).toBe(1)
    })

    describe.only('when destroying the component', () => {
      it('should clear all registered pages', () => {
        wrapper.unmount()

        const pages = usePagesStore()

        expect(pages.count).toBe(0)
      })
    })

    describe('when pressing the LEFT arrow', () => {
      it('should not send a navigation event', () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForLeftArrow()

        expect(navigationEvents.count).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should not send a navigation event', () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForRightArrow()

        expect(navigationEvents.count).toBe(0)
      })
    })
  })

  describe('given THREE pages', () => {
    beforeEach(() => {
      factoryWithPinia({
        slots: {
          default: [
            Page,
            Page,
            Page
          ]
        }
      })
    })

    it('should update the navigation state', () => {
      const pages = usePagesStore()

      expect(pages.count).toBe(3)
    })

    describe('when pressing the LEFT arrow', () => {
      it('should not send a LEFT navigation event (as we cannot go left)', async () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForLeftArrow()

        expect(navigationEvents.count).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should send a RIGHT navigation event', async () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForRightArrow()
        expect(navigationEvents.count).toBe(1)
        expect(navigationEvents.lastEvent.direction).toBe(DIRECTION.RIGHT)
        expect(navigationEvents.lastEvent.fromPageIndex).toBe(0)
        expect(navigationEvents.lastEvent.toPageIndex).toBe(1)
      })
    })

    describe('when pressing the RIGHT arrow followed by the LEFT arrow', () => {
      it('should send a LEFT navigation event and a RIGHT navigation event', () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForRightArrow()
        expect(navigationEvents.count).toBe(1)
        expect(navigationEvents.lastEvent.direction).toBe(DIRECTION.RIGHT)
        expect(navigationEvents.lastEvent.fromPageIndex).toBe(0)
        expect(navigationEvents.lastEvent.toPageIndex).toBe(1)

        dispatchKeydownForLeftArrow()
        expect(navigationEvents.count).toBe(2)
        expect(navigationEvents.lastEvent.direction).toBe(DIRECTION.LEFT)
        expect(navigationEvents.lastEvent.fromPageIndex).toBe(1)
        expect(navigationEvents.lastEvent.toPageIndex).toBe(0)
      })
    })

    describe('when pressing 2 RIGHT arrows', () => {
      it('should send 2 RIGHT navigation events', () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForRightArrow()
        dispatchKeydownForRightArrow()

        expect(navigationEvents.count).toBe(2)
      })
    })

    describe('when pressing 3 RIGHT arrows', () => {
      it('should only send 2 RIGHT navigation events (as we cannot go further right)', () => {
        const navigationEvents = useNavigationEventsStore()

        dispatchKeydownForRightArrow()
        dispatchKeydownForRightArrow()
        dispatchKeydownForRightArrow()

        expect(navigationEvents.count).toBe(2)
      })
    })
  })
})

const factoryWithPinia = (options) => {
  return mount(Component, {
    ...options,
    global: {
      plugins: [createTestingPinia({
        stubActions: false
      })]
    }
  })
}

const dispatchKeydownForLeftArrow = () => {
  const event = new KeyboardEvent('keydown', { keyCode: KEY_CODE.LEFT })

  global.window.dispatchEvent(event)
}

const dispatchKeydownForRightArrow = () => {
  const event = new KeyboardEvent('keydown', { keyCode: KEY_CODE.RIGHT })

  global.window.dispatchEvent(event)
}
