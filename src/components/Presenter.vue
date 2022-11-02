<template>
  <div
    class="c-presenter"
    @keydown.right="onPageRight"
    @keydown.left="onPageLeft"
  >
    <slot />
  </div>
</template>

<script>
import { useNavigationEventsStore, usePagesStore } from '@/stores/navigation'
import { DIRECTION } from '@/utils/constants'

export default {
  data () {
    return {
      currentPageIndex: 0,
      navigationEvents: useNavigationEventsStore(),
      pages: usePagesStore()
    }
  },
  methods: {
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

<style></style>
