import {
  mount
} from '@vue/test-utils'
import {
  createTestingPinia
} from '@pinia/testing'

import Component from '@/components/Presenter.vue'
import Page from '@/components/Page.vue'

import {
  DIRECTION,
  KEY_CODE
} from '@/utils/constants'
import { useNavigationStore } from '@/stores/navigation'

let wrapper, navigationStore

describe('Presenter.vue', () => {
  afterEach(() => navigationStore && navigationStore.reset())

  describe('given no pages', () => {
    beforeEach(() => {
      wrapper = factoryWithPinia()

      navigationStore = useNavigationStore()
    })

    it('should have a page count of 0', () => {
      expect(navigationStore.pageCount).toBe(0)
    })

    it('should not have an active page', () => {
      expect(navigationStore.activePageIndex).toBeNull
    })

    describe('when pressing the LEFT arrow', () => {
      it('should not send a navigation event', async () => {
        await wrapper.trigger('keydown.left')

        expect(navigationStore.eventCount).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should not send a navigation event', async () => {
        await wrapper.trigger('keydown.right')

        expect(navigationStore.eventCount).toBe(0)
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

      navigationStore = useNavigationStore()
    })

    it('should have a page count of 1', () => {
      expect(navigationStore.pageCount).toBe(1)
    })

    it('should set the first page as the active page', () => {
      expect(navigationStore.activePageIndex).toBe(0)
    })

    describe('when destroying the component', () => {
      beforeEach(() => wrapper.unmount())

      it('should clear all registered pages', () => {
        expect(navigationStore.pageCount).toBe(0)
      })

      it('should clear all events', () => {
        expect(navigationStore.eventCount).toBe(0)
      })

      it('should not have an active page', () => {
        expect(navigationStore.activePageIndex).toBeNull
      })
    })

    describe('when pressing the LEFT arrow', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.left')
      })

      it('should still keep the first page as the active page', () => {
        expect(navigationStore.activePageIndex).toBe(0)
      })

      it('should not send a navigation event (as we cannot go left)', () => {
        expect(navigationStore.eventCount).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
      })

      it('should still keep the first page as the active page', () => {
        expect(navigationStore.activePageIndex).toBe(0)
      })

      it('should not send a navigation event (as we cannot go right)', () => {
        expect(navigationStore.eventCount).toBe(0)
      })
    })
  })

  describe('given THREE pages', () => {
    beforeEach(() => {
      wrapper = factoryWithPinia({
        slots: {
          default: [
            Page,
            Page,
            Page
          ]
        }
      })

      navigationStore = useNavigationStore()
    })

    it('should have a page count of 3', () => {
      expect(navigationStore.pageCount).toBe(3)
    })

    it('should set the first page as the active page', () => {
      expect(navigationStore.activePageIndex).toBe(0)
    })

    describe('when pressing the LEFT arrow', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.left')
      })

      it('should still keep the first page as the active page', () => {
        expect(navigationStore.activePageIndex).toBe(0)
      })

      it('should not send a navigation event (as we cannot go left)', () => {
        expect(navigationStore.eventCount).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
      })

      it('should set the second page as the active page', () => {
        expect(navigationStore.activePageIndex).toBe(1)
      })

      it('should send a RIGHT navigation event', () => {
        expect(navigationStore.eventCount).toBe(1)
        expect(navigationStore.lastEvent.direction).toBe(DIRECTION.RIGHT)
        expect(navigationStore.lastEvent.fromPageIndex).toBe(0)
        expect(navigationStore.lastEvent.toPageIndex).toBe(1)
      })
    })

    describe('when pressing the RIGHT arrow followed by the LEFT arrow', () => {
      it('should set the first page as the active page', async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.left')

        expect(navigationStore.activePageIndex).toBe(0)
      })

      it('should send a LEFT navigation event and a RIGHT navigation event', async () => {
        const navigationStore = useNavigationStore()

        await wrapper.trigger('keydown.right')
        expect(navigationStore.eventCount).toBe(1)
        expect(navigationStore.lastEvent.direction).toBe(DIRECTION.RIGHT)
        expect(navigationStore.lastEvent.fromPageIndex).toBe(0)
        expect(navigationStore.lastEvent.toPageIndex).toBe(1)

        await wrapper.trigger('keydown.left')
        expect(navigationStore.eventCount).toBe(2)
        expect(navigationStore.lastEvent.direction).toBe(DIRECTION.LEFT)
        expect(navigationStore.lastEvent.fromPageIndex).toBe(1)
        expect(navigationStore.lastEvent.toPageIndex).toBe(0)
      })
    })

    describe('when pressing 2 RIGHT arrows', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
      })

      it('should set the third page as the active page', () => {
        expect(navigationStore.activePageIndex).toBe(2)
      })

      it('should send 2 RIGHT navigation events', () => {
        expect(navigationStore.eventCount).toBe(2)
      })
    })

    describe('when pressing 3 RIGHT arrows', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
      })

      it('should set the third page as the active page', () => {
        expect(navigationStore.activePageIndex).toBe(2)
      })

      it('should send 2 RIGHT navigation events  (as we cannot go further right)', () => {
        expect(navigationStore.eventCount).toBe(2)
      })
    })
  })
})

const factoryWithPinia = (options) => {
  return mount(Component, {
    ...options,
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia({
        stubActions: false
      })]
    }
  })
}
