<template>
  <Viewport>
    <div
      class="c-presenter"
      :style="style"
    >
      <slot />
    </div>
  </Viewport>
</template>

<script>
import { useClientDimensionsStore } from '@/stores/client-dimensions'
import { usePagesStore } from '@/stores/pages'
import { useNavigationEventsStore } from '@/stores/navigation-events'
import { DIRECTION, KEY_CODE } from '@/utils/constants'

import Viewport from '@/components/Viewport.vue'

export default {
  components: {
    Viewport
  },
  data () {
    return {
      clientDimentions: useClientDimensionsStore(),
      currentPageIndex: 0,
      navigationEvents: useNavigationEventsStore(),
      pages: usePagesStore()
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('keydown', this.onKeydown)
    })
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.onKeydown)

    this.clearPages()
  },
  computed: {
    style () {
      return {
        width: `${this.width}px`,
        transform: `translateX(${this.xOffset}px)`
      }
    },
    width () {
      return this.clientDimentions.width * this.pages.count
    },
    xOffset () {
      return this.clientDimentions.width * this.currentPageIndex
    }
  },
  methods: {
    clearPages () {
      this.pages.clear()
    },
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
    }
  }
}
</script>

<style>
.c-presenter {
  height: 100%;
  width: 100%;

  transition: transform 0.5s easing;
}
</style>
