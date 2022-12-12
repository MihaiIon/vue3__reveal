<template>
  <main
    class="c-presenter"
    :style="style"
  >
    <slot />
  </main>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useViewportStore } from '@/stores/viewport'
import { useNavigationStore } from '@/stores/navigation'
import { DIRECTION, KEY_CODE } from '@/utils/constants'
import { getClientWidth } from '@/utils/helpers'

export default {
  created () {
    window.addEventListener('keydown', this.onKeydown)

    window.addEventListener('resize', this.onResize)
    this.updateViewport()
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.onKeydown)
    window.removeEventListener('resize', this.onResize)

    this.resetNavigation()
  },
  computed: {
    ...mapState(useViewportStore, { viewportWidth: 'width' }),
    ...mapState(useNavigationStore, ['activePageIndex', 'eventCount', 'pageCount']),
    style () {
      let width = this.viewportWidth * this.pageCount
      let xOffset = -(this.viewportWidth * this.activePageIndex)

      if (this.activePageIndex === null || this.pageCount <= 1) {
        width = this.viewportWidth
        xOffset = 0
      }

      return {
        width: `${width}px`,
        transform: `translateX(${xOffset}px)`
      }
    }
  },
  methods: {
    ...mapActions(useNavigationStore, ['addPageEvent']),
    ...mapActions(useNavigationStore, { resetNavigation: 'reset' }),
    ...mapActions(useViewportStore, { updateViewportWidth: 'updateWidth' }),
    onKeydown (event) {
      if (this.activePageIndex === null || this.pageCount < 2) return

      if (event.keyCode === KEY_CODE.LEFT) return this.onPageLeft()
      if (event.keyCode === KEY_CODE.RIGHT) return this.onPageRight()
    },
    onPageLeft () {
      if (this.activePageIndex === 0) return

      const previousPageIndex = this.activePageIndex
      const nextPageIndex = this.activePageIndex - 1

      this.addPageEvent(
        DIRECTION.LEFT,
        previousPageIndex,
        nextPageIndex
      )
    },
    onPageRight () {
      if (this.activePageIndex + 1 >= this.pageCount) return

      const previousPageIndex = this.activePageIndex
      const nextPageIndex = this.activePageIndex + 1

      this.addPageEvent(
        DIRECTION.RIGHT,
        previousPageIndex,
        nextPageIndex
      )
    },
    onResize () {
      this.updateViewport()
    },
    updateViewport () {
      const width = getClientWidth()
      this.updateViewportWidth(width)
    }
  }
}
</script>

<style>
.c-presenter {
  height: 100%;
  width: 100%;

  transition: transform 0.5s;
}
</style>
