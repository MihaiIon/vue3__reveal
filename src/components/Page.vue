<template>
  <section class="c-page" :style="pageStyle">
    <div class="c-page__content">
      Hello
      <slot />
    </div>
  </section>
</template>

<script>
import { getCurrentInstance, ref } from 'vue'

// import { v4 as uuidv4 } from 'uuid'
// import { usePagesStore } from '@/stores/navigation-events'
import { useNavigationStore } from '@/stores/navigation'
import { useViewportStore } from '@/stores/viewport'

export default {
  setup () {
    const instance = getCurrentInstance()

    const navigationStore = useNavigationStore()
    const viewportStore = useViewportStore()

    const pageIndex = ref(navigationStore.registerPage(instance))
    const pageStyle = ref({
      height: `${viewportStore.height}px`,
      width: `${viewportStore.width}px`
    })

    return { pageIndex, pageStyle }
  }
}

// export default {
//   data () {
//     return {
//       instanceId: uuidv4(),
//       clientDimensions: useViewportStore(),
//       pages: usePagesStore()
//     }
//   },
//   created () {
//     this.registerPage()
//   },
//   computed: {
//     style () {
//       return {
//         width: `${this.clientDimensions.width}px`,
//         minHeight: `${this.clientDimensions.height}px`
//       }
//     }
//   },
//   methods: {
//     registerPage () {
//       this.pages.registerPageById(this.instanceId)
//     }
//   }
// }
</script>

<style>
.c-page,
.c-page__content {
  justify-content: center;
  align-items: center;
}

.c-page {
  display: inline-flex;
  overflow: hidden;
}

.c-page__content {
  display: flex;
  width: min(800px, 100%);
}
</style>
