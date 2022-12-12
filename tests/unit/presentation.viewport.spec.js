import {
  mount
} from '@vue/test-utils'
import {
  createTestingPinia
} from '@pinia/testing'

import Presentation from '@/components/Presentation.vue'
import Page from '@/components/Page.vue'

const CLIENT_WIDTH = 1024
const RESIZED_CLIENT_WIDTH = 900

let wrapper

describe('Presentation.vue', () => {
  beforeEach(() => {
    resizeClientWidthTo(CLIENT_WIDTH)
  })

  describe('given no pages', () => {
    beforeEach(() => {
      wrapper = factoryWithPinia()
    })

    it("should match the presentation width to the client's width", () => {
      expect(wrapper.vm.style.width).toBe(`${CLIENT_WIDTH}px`)
    })

    it('should not translate the presentation on the X axis', () => {
      expect(wrapper.vm.style.transform).toBe('translateX(0px)')
    })

    describe('when resizing the window', () => {
      beforeEach(() => {
        resizeClientWidthTo(RESIZED_CLIENT_WIDTH)
      })

      it("should match the presentation width to the resized client's width", () => {
        expect(wrapper.vm.style.width).toBe(`${RESIZED_CLIENT_WIDTH}px`)
      })

      it('should STILL not translate the presentation on the X axis', () => {
        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the LEFT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.right')

        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
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

    it("should match the presentation width to the client's width", () => {
      expect(wrapper.vm.style.width).toBe(`${CLIENT_WIDTH}px`)
    })

    it('should not translate the presentation on the X axis', () => {
      expect(wrapper.vm.style.transform).toBe('translateX(0px)')
    })

    describe('when resizing the window', () => {
      beforeEach(() => {
        resizeClientWidthTo(RESIZED_CLIENT_WIDTH)
      })

      it("should match the presentation width to the resized client's width", () => {
        expect(wrapper.vm.style.width).toBe(`${RESIZED_CLIENT_WIDTH}px`)
      })

      it('should STILL not translate the presentation on the X axis', () => {
        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the LEFT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.right')

        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
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
    })

    it("should set the presentation width to 3 times the client's width", () => {
      expect(wrapper.vm.style.width).toBe(`${CLIENT_WIDTH * 3}px`)
    })

    it('should not translate the presentation on the X axis', () => {
      expect(wrapper.vm.style.transform).toBe('translateX(0px)')
    })

    describe('when resizing the window', () => {
      beforeEach(() => {
        resizeClientWidthTo(RESIZED_CLIENT_WIDTH)
      })

      it("should set the presentation width to 3 times the resized client's width", () => {
        expect(wrapper.vm.style.width).toBe(`${RESIZED_CLIENT_WIDTH * 3}px`)
      })

      it('should STILL not translate the presentation on the X axis', () => {
        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the LEFT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
      })

      it("should translate the presentation on the X axis (1 times the client's width) to the left", async () => {
        expect(wrapper.vm.style.transform).toBe(`translateX(-${CLIENT_WIDTH}px)`)
      })

      describe("and resizing the window's width", () => {
        it("should translate the presentation on the X axis (1 times the resized client's width) to the left", async () => {
          resizeClientWidthTo(RESIZED_CLIENT_WIDTH)

          expect(wrapper.vm.style.transform).toBe(`translateX(-${RESIZED_CLIENT_WIDTH}px)`)
        })
      })
    })

    describe('when pressing the RIGHT arrow followed by the LEFT arrow', () => {
      it('should translate the presentation on the X axis back to its origin', async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.style.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing 2 RIGHT arrows', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
      })

      it("should translate the presentation on the X axis (2 times the client's width) to the left", async () => {
        expect(wrapper.vm.style.transform).toBe(`translateX(-${CLIENT_WIDTH * 2}px)`)
      })

      describe("and resizing the window's width", () => {
        it("should translate the presentation on the X axis (2 times the resized client's width) to the left", async () => {
          resizeClientWidthTo(RESIZED_CLIENT_WIDTH)

          expect(wrapper.vm.style.transform).toBe(`translateX(-${RESIZED_CLIENT_WIDTH * 2}px)`)
        })
      })
    })

    describe('when pressing 3 RIGHT arrows', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
      })

      it("should translate the presentation on the X axis (2 times the client's width) to the left - it cannot go further", async () => {
        expect(wrapper.vm.style.transform).toBe(`translateX(-${CLIENT_WIDTH * 2}px)`)
      })

      describe("and resizing the window's width", () => {
        it("should translate the presentation on the X axis (2 times the resized client's width) to the left - it cannot go further", async () => {
          resizeClientWidthTo(RESIZED_CLIENT_WIDTH)

          expect(wrapper.vm.style.transform).toBe(`translateX(-${RESIZED_CLIENT_WIDTH * 2}px)`)
        })
      })
    })
  })
})

const factoryWithPinia = (options) => {
  return mount(Presentation, {
    ...options,
    attachTo: document.body,
    global: {
      plugins: [createTestingPinia({
        stubActions: false
      })]
    }
  })
}

const resizeClientWidthTo = (width) => {
  global.window.innerWidth = width || global.window.innerWidth

  global.window.dispatchEvent(new Event('resize'))
}
