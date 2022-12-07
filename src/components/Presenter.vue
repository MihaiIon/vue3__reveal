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
import { mapState, mapActions } from 'pinia'

import { useClientDimensionsStore } from '@/stores/client-dimensions'
import { useNavigationStore } from '@/stores/navigation'
import { DIRECTION, KEY_CODE } from '@/utils/constants'

import Viewport from '@/components/Viewport.vue'

export default {
  components: {
    Viewport
  },
  data () {
    return {
      clientDimentions: useClientDimensionsStore()
    }
  },
  created () {
    window.addEventListener('keydown', this.onKeydown)
  },
  beforeUnmount () {
    window.removeEventListener('keydown', this.onKeydown)

    this.resetNavigation()
  },
  computed: {
    ...mapState(useNavigationStore, ['activePageIndex', 'pageCount', 'eventCount']),
    style () {
      return {
        width: `${this.width}px`,
        transform: `translateX(${-this.xOffset}px)`
      }
    },
    width () {
      return this.clientDimentions.width * this.pageCount
    },
    xOffset () {
      return this.clientDimentions.width * this.activePageIndex
    }
  },
  methods: {
    ...mapActions(useNavigationStore, ['addPageEvent']),
    ...mapActions(useNavigationStore, { resetNavigation: 'reset' }),
    onKeydown (event) {
      if (this.activePageIndex === null) return

      if (event.keyCode === KEY_CODE.LEFT) return this.onPageLeft()
      if (event.keyCode === KEY_CODE.RIGHT) return this.onPageRight()
    },
    onPageLeft () {
      if (this.pageCount < 2) return
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
      if (this.pageCount < 2) return
      if (this.activePageIndex + 1 >= this.pageCount) return

      const previousPageIndex = this.activePageIndex
      const nextPageIndex = this.activePageIndex + 1

      this.addPageEvent(
        DIRECTION.RIGHT,
        previousPageIndex,
        nextPageIndex
      )
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
