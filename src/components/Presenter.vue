<template>
  <div
    class="c-presenter"
    :style="style"
  >
    <slot />
  </div>
</template>

<script>
import { usePagesStore } from '@/stores/pages'
import { useNavigationEventsStore } from '@/stores/navigation-events'
import { DIRECTION, KEY_CODE } from '@/utils/constants'

const getClientWidth = () => {
  let clientWidth = window.innerWidth
  clientWidth = clientWidth || document.documentElement.clientWidth
  clientWidth = clientWidth || document.body.clientWidth

  return clientWidth
}

export default {
  data () {
    return {
      clientWidth: getClientWidth(),
      currentPageIndex: 0,
      navigationEvents: useNavigationEventsStore(),
      pages: usePagesStore()
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      window.addEventListener('keydown', this.onKeydown)
    })
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keydown', this.onKeydown)

    this.pages.clear()
  },
  computed: {
    style () {
      return {
        width: `${this.width}px`,
        transform: `translateX(${this.xOffset}px)`
      }
    },
    width () {
      return this.clientWidth * this.pages.count
    },
    xOffset () {
      return this.currentPageIndex * this.clientWidth
    }
  },
  methods: {
    onKeydown (event) {
      if (event.keyCode === KEY_CODE.LEFT) return this.onPageLeft()
      if (event.keyCode === KEY_CODE.RIGHT) return this.onPageRight()
    },
    onPageLeft () {
      if (this.pages.count < 2) return
      if (this.currentPageIndex === 0) return

      const previousPageIndex = this.currentPageIndex
      const nextPageIndex = this.currentPageIndex - 1

      this.navigationEvents.addPageEvent(
        DIRECTION.LEFT,
        previousPageIndex,
        nextPageIndex
      )

      this.currentPageIndex = nextPageIndex
    },
    onPageRight () {
      if (this.pages.count < 2) return
      if (this.currentPageIndex + 1 >= this.pages.count) return

      const previousPageIndex = this.currentPageIndex
      const nextPageIndex = this.currentPageIndex + 1

      this.navigationEvents.addPageEvent(
        DIRECTION.RIGHT,
        previousPageIndex,
        nextPageIndex
      )

      this.currentPageIndex = nextPageIndex
    },
    onResize () {
      this.clientWidth = getClientWidth()
    }
  }
}
</script>

<style>
.c-presenter {
  height: 100%;
  width: 100%;
}
</style>
