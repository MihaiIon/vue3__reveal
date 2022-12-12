<template>
  <main class="c-viewport">
    <slot />
  </main>
</template>

<script>
import { mapActions } from 'pinia'

import { useViewportStore } from '@/stores/viewport'
import { getClientWidth } from '@/utils/helpers'

export default {
  mounted () {
    this.updateViewport()

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    ...mapActions(useViewportStore, { updateViewportWidth: 'updateWidth' }),
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
.c-viewport {
  width: 100%;
  height: 100%;
}
</style>
