import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import Presentation from '@/components/Presentation.vue'
import Page from '@/components/Page.vue'

const WINDOW_HEIGHT = 1200
const RESIZED_WINDOW_HEIGHT = 800

const WINDOW_WIDTH = 1024
const RESIZED_WINDOW_WIDTH = 900

let wrapper

describe('Presentation.vue', () => {
  beforeEach(() => {
    resizeWindowTo(WINDOW_HEIGHT, WINDOW_WIDTH)
  })

  describe('given no pages', () => {
    beforeEach(() => {
      wrapper = factoryWithPinia()
    })

    it("should match the presentation's height to the window's height", () => {
      expect(wrapper.vm.presentationStyle.height).toBe(`${WINDOW_HEIGHT}px`)
    })

    it("should match the presentation's width to the window's width", () => {
      expect(wrapper.vm.presentationStyle.width).toBe(`${WINDOW_WIDTH}px`)
    })

    it('should not translate the presentation on the X axis', () => {
      expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
    })

    describe('when resizing the window', () => {
      beforeEach(() => {
        resizeWindowTo(RESIZED_WINDOW_HEIGHT, RESIZED_WINDOW_WIDTH)
      })

      it("should match the presentation's height to the window's height", () => {
        expect(wrapper.vm.presentationStyle.height).toBe(`${RESIZED_WINDOW_HEIGHT}px`)
      })

      it("should match the presentation's width to the resized winsow's width", () => {
        expect(wrapper.vm.presentationStyle.width).toBe(`${RESIZED_WINDOW_WIDTH}px`)
      })

      it('should STILL not translate the presentation on the X axis', () => {
        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the LEFT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.right')

        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
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

    it("should match the presentation's width to the window's width", () => {
      expect(wrapper.vm.presentationStyle.width).toBe(`${WINDOW_WIDTH}px`)
    })

    it('should not translate the presentation on the X axis', () => {
      expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
    })

    describe('when resizing the window', () => {
      beforeEach(() => {
        resizeWindowTo(RESIZED_WINDOW_HEIGHT, RESIZED_WINDOW_WIDTH)
      })

      it("should match the presentation's height to the resized winsow's height", () => {
        expect(wrapper.vm.presentationStyle.height).toBe(`${RESIZED_WINDOW_HEIGHT}px`)
      })

      it("should match the presentation's width to the resized winsow's width", () => {
        expect(wrapper.vm.presentationStyle.width).toBe(`${RESIZED_WINDOW_WIDTH}px`)
      })

      it('should STILL not translate the presentation on the X axis', () => {
        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the LEFT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.right')

        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
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

    it("should set the presentation's width to 3 times the window's width", () => {
      expect(wrapper.vm.presentationStyle.width).toBe(`${WINDOW_WIDTH * 3}px`)
    })

    it('should not translate the presentation on the X axis', () => {
      expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
    })

    describe('when resizing the window', () => {
      beforeEach(() => {
        resizeWindowTo(RESIZED_WINDOW_HEIGHT, RESIZED_WINDOW_WIDTH)
      })

      it("should set the presentation's width to 3 times the resized window's width", () => {
        expect(wrapper.vm.presentationStyle.width).toBe(`${RESIZED_WINDOW_WIDTH * 3}px`)
      })

      it('should STILL not translate the presentation on the X axis', () => {
        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the LEFT arrow', () => {
      it('should STILL not translate the presentation on the X axis', async () => {
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing the RIGHT arrow', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
      })

      it("should translate the presentation on the X axis (1 times the window's width) to the left", async () => {
        expect(wrapper.vm.presentationStyle.transform).toBe(`translateX(-${WINDOW_WIDTH}px)`)
      })

      describe('and resizing the window', () => {
        it("should translate the presentation on the X axis (1 times the resized window's width) to the left", async () => {
          resizeWindowTo(WINDOW_HEIGHT, RESIZED_WINDOW_WIDTH)

          expect(wrapper.vm.presentationStyle.transform).toBe(`translateX(-${RESIZED_WINDOW_WIDTH}px)`)
        })
      })
    })

    describe('when pressing the RIGHT arrow followed by the LEFT arrow', () => {
      it('should translate the presentation on the X axis back to its origin', async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.left')

        expect(wrapper.vm.presentationStyle.transform).toBe('translateX(0px)')
      })
    })

    describe('when pressing 2 RIGHT arrows', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
      })

      it("should translate the presentation on the X axis (2 times the window's width) to the left", async () => {
        expect(wrapper.vm.presentationStyle.transform).toBe(`translateX(-${WINDOW_WIDTH * 2}px)`)
      })

      describe('and resizing the window', () => {
        it("should translate the presentation on the X axis (2 times the resized window's width) to the left", async () => {
          resizeWindowTo(RESIZED_WINDOW_HEIGHT, RESIZED_WINDOW_WIDTH)

          expect(wrapper.vm.presentationStyle.transform).toBe(`translateX(-${RESIZED_WINDOW_WIDTH * 2}px)`)
        })
      })
    })

    describe('when pressing 3 RIGHT arrows', () => {
      beforeEach(async () => {
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
        await wrapper.trigger('keydown.right')
      })

      it("should translate the presentation on the X axis (2 times the window's width) to the left - it cannot go further", async () => {
        expect(wrapper.vm.presentationStyle.transform).toBe(`translateX(-${WINDOW_WIDTH * 2}px)`)
      })

      describe('and resizing the window', () => {
        it("should translate the presentation on the X axis (2 times the resized window's width) to the left - it cannot go further", async () => {
          resizeWindowTo(RESIZED_WINDOW_HEIGHT, RESIZED_WINDOW_WIDTH)

          expect(wrapper.vm.presentationStyle.transform).toBe(`translateX(-${RESIZED_WINDOW_WIDTH * 2}px)`)
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

const resizeWindowTo = (height, width) => {
  global.window.innerHeight = height || global.window.innerHeight
  global.window.innerWidth = width || global.window.innerWidth

  global.window.dispatchEvent(new Event('resize'))
}
