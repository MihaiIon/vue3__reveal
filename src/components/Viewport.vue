<template>
  <main class="c-viewport">
    <slot />
  </main>
</template>

<script>
import { useClientDimensionsStore } from '@/stores/client-dimensions'
import { getClientWidth } from '@/utils/helpers'

export default {
  data () {
    return {
      clientDimensions: useClientDimensionsStore()
    }
  },
  mounted () {
    this.updateClienWidth()

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.updateClienWidth()
    },
    updateClienWidth () {
      const width = getClientWidth()

      this.clientDimensions.setWidth(width)
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
