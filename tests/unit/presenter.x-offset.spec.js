// import {
//   mount
// } from '@vue/test-utils'
// import {
//   createTestingPinia
// } from '@pinia/testing'

// import Component from '@/components/Presenter.vue'
// import Page from '@/components/Page.vue'

// import {
//   KEY_CODE
// } from '@/utils/constants'

// const CLIENT_WIDTH = 1024
// const RESIZED_CLIENT_WIDTH = 900

// let wrapper

// describe('Presenter.vue', () => {
//   beforeEach(() => {
//     resizeClientWidthTo(CLIENT_WIDTH)
//   })

//   describe('given no pages', () => {
//     beforeEach(() => {
//       wrapper = factoryWithPinia()
//     })

//     it('should have a xOffset of 0', () => {
//       expect(wrapper.vm.xOffset).toBe(0)
//     })

//     describe('when resizing the window', () => {
//       it('should still have a xOffset of 0', () => {
//         expect(wrapper.vm.xOffset).toBe(0)
//       })
//     })

//     describe('when pressing the LEFT arrow', () => {
//       it('should have a xOffset of 0', async () => {
//         dispatchKeydownForLeftArrow()

//         expect(wrapper.vm.xOffset).toBe(0)
//       })
//     })

//     describe('when pressing the RIGHT arrow', () => {
//       it('should have a xOffset of 0', async () => {
//         dispatchKeydownForRightArrow()

//         expect(wrapper.vm.xOffset).toBe(0)
//       })
//     })
//   })

//   describe('given ONE page', () => {
//     beforeEach(() => {
//       wrapper = factoryWithPinia({
//         slots: {
//           default: Page
//         }
//       })
//     })

//     it('should have a xOffset of 0', () => {
//       expect(wrapper.vm.xOffset).toBe(0)
//     })

//     describe('when pressing the LEFT arrow', () => {
//       it('should have a xOffset of 0', async () => {
//         dispatchKeydownForLeftArrow()

//         expect(wrapper.vm.xOffset).toBe(0)
//       })
//     })

//     describe('when pressing the RIGHT arrow', () => {
//       it('should have a xOffset of 0', async () => {
//         dispatchKeydownForRightArrow()

//         expect(wrapper.vm.xOffset).toBe(0)
//       })
//     })
//   })

//   describe('given THREE pages', () => {
//     beforeEach(() => {
//       wrapper = factoryWithPinia({
//         slots: {
//           default: [
//             Page,
//             Page,
//             Page
//           ]
//         }
//       })
//     })

//     it('should have a xOffset of 0', () => {
//       expect(wrapper.vm.xOffset).toBe(0)
//     })

//     describe('when pressing the LEFT arrow', () => {
//       it('should have a xOffset of 0', async () => {
//         dispatchKeydownForLeftArrow()

//         expect(wrapper.vm.xOffset).toBe(0)
//       })
//     })

//     describe('when pressing the RIGHT arrow', () => {
//       beforeEach(() => {
//         dispatchKeydownForRightArrow()
//       })

//       it("should have a xOffset equal to the window's width", async () => {
//         expect(wrapper.vm.xOffset).toBe(CLIENT_WIDTH)
//       })

//       describe("and resizing the window's width", () => {
//         it("should have a xOffset equal to the window's resized width", async () => {
//           resizeClientWidthTo(RESIZED_CLIENT_WIDTH)

//           expect(wrapper.vm.xOffset).toBe(RESIZED_CLIENT_WIDTH)
//         })
//       })
//     })

//     describe('when pressing the RIGHT arrow followed by the LEFT arrow', () => {
//       it('should have a xOffset of 0', async () => {
//         dispatchKeydownForRightArrow()
//         dispatchKeydownForLeftArrow()

//         expect(wrapper.vm.xOffset).toBe(0)
//       })
//     })

//     describe('when pressing 2 RIGHT arrows', () => {
//       beforeEach(() => {
//         dispatchKeydownForRightArrow()
//         dispatchKeydownForRightArrow()
//       })

//       it("should have a xOffset equal to the window's width times 2", async () => {
//         expect(wrapper.vm.xOffset).toBe(CLIENT_WIDTH * 2)
//       })

//       describe("and resizing the window's width", () => {
//         it("should have a xOffset equal to the window's resized width times 2", async () => {
//           resizeClientWidthTo(RESIZED_CLIENT_WIDTH)

//           expect(wrapper.vm.xOffset).toBe(RESIZED_CLIENT_WIDTH * 2)
//         })
//       })
//     })

//     describe('when pressing 3 RIGHT arrows', () => {
//       beforeEach(() => {
//         dispatchKeydownForRightArrow()
//         dispatchKeydownForRightArrow()
//         dispatchKeydownForRightArrow()
//       })

//       it("should have a xOffset equal to the window's width times 2 (it cannot go further)", async () => {
//         expect(wrapper.vm.xOffset).toBe(CLIENT_WIDTH * 2)
//       })

//       describe("and resizing the window's width", () => {
//         it("should have a xOffset equal to the window's resized width times 2 (it cannot go further)", async () => {
//           resizeClientWidthTo(RESIZED_CLIENT_WIDTH)

//           expect(wrapper.vm.xOffset).toBe(RESIZED_CLIENT_WIDTH * 2)
//         })
//       })
//     })
//   })
// })

// const factoryWithPinia = (options) => {
//   return mount(Component, {
//     ...options,
//     global: {
//       plugins: [createTestingPinia({
//         stubActions: false
//       })]
//     }
//   })
// }

// const dispatchKeydownForLeftArrow = () => {
//   const event = new KeyboardEvent('keydown', { keyCode: KEY_CODE.LEFT })

//   global.window.dispatchEvent(event)
// }

// const dispatchKeydownForRightArrow = () => {
//   const event = new KeyboardEvent('keydown', { keyCode: KEY_CODE.RIGHT })

//   global.window.dispatchEvent(event)
// }

// const resizeClientWidthTo = (width) => {
//   global.window.innerWidth = width || global.window.innerWidth

//   global.window.dispatchEvent(new Event('resize'))
// }
