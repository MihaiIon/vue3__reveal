import {
  shallowMount,
  mount
} from '@vue/test-utils'
import {
  setActivePinia,
  createPinia
} from 'pinia'

import Component from '@/components/Presenter.vue'
import Page from '@/components/Page.vue'

import {
  usePagesStore,
  useNavigationEventsStore
} from '@/stores/navigation'
import { DIRECTION } from "@/utils/constants";

let wrapper;

describe('Presenter.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('given no pages', () => {
    beforeEach(() => {
      wrapper = shallowMount(Component)
    })

    it('should not update the navigation state', () => {
      const pages = usePagesStore()

      expect(pages.count).toBe(0)
    });

    describe('when pressing the LEFT arrow', () => {
      it('should not send a navigation event', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.left')

        expect(navigationEvents.count).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should not send a navigation event', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.right')

        expect(navigationEvents.count).toBe(0)
      })
    })
  })

  describe('given ONE page', () => {
    beforeEach(() => {
      wrapper = mount(Component, {
        slots: {
          default: Page
        }
      })
    })

    it('should register the page', () => {
      const pages = usePagesStore()

      expect(pages.count).toBe(1)
    })

    describe('when pressing the LEFT arrow', () => {
      it('should not send a navigation event', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.left')

        expect(navigationEvents.count).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should not send a navigation event', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.right')

        expect(navigationEvents.count).toBe(0)
      })
    })
  })

  describe('given THREE pages', () => {
    beforeEach(() => {
      wrapper = mount(Component, {
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

        await wrapper.trigger('keydown.left')

        expect(navigationEvents.count).toBe(0)
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should send a RIGHT navigation event', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.right')
        expect(navigationEvents.count).toBe(1)
        expect(navigationEvents.lastEvent.direction).toBe(DIRECTION.RIGHT)
        expect(navigationEvents.lastEvent.fromPageIndex).toBe(0)
        expect(navigationEvents.lastEvent.toPageIndex).toBe(1)
      })
    })

    describe('when pressing the LEFT arrow followed by the RIGHT arrow', () => {
      it('should send a LEFT navigation event and a RIGHT navigation event', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.right')
        expect(navigationEvents.count).toBe(1)
        expect(navigationEvents.lastEvent.direction).toBe(DIRECTION.RIGHT)
        expect(navigationEvents.lastEvent.fromPageIndex).toBe(0)
        expect(navigationEvents.lastEvent.toPageIndex).toBe(1)

        await wrapper.trigger('keydown.left')
        expect(navigationEvents.count).toBe(2)
        expect(navigationEvents.lastEvent.direction).toBe(DIRECTION.LEFT)
        expect(navigationEvents.lastEvent.fromPageIndex).toBe(1)
        expect(navigationEvents.lastEvent.toPageIndex).toBe(0)
      })
    })

    describe('when pressing 2 RIGHT arrows', () => {
      it('should send 2 RIGHT navigation events', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
        expect(navigationEvents.count).toBe(2)
      })
    })

    describe('when pressing 3 RIGHT arrows', () => {
      it('should only send 2 RIGHT navigation events (as we cannot go further right)', async () => {
        const navigationEvents = useNavigationEventsStore()

        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
        expect(navigationEvents.count).toBe(3)
      })
    })
  })
})
