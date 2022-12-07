<template>
  <section class="c-page" :style="style">
    <div class="c-page__wrapper">
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
// import { useClientDimensionsStore } from '@/stores/client-dimensions'

export default {
  setup () {
    const instance = getCurrentInstance()
    const navigationStore = useNavigationStore()

    const pageIndex = ref(navigationStore.registerPage(instance))
    const style = ref('color: red')

    return { pageIndex, style }
  }
}

// export default {
//   data () {
//     return {
//       instanceId: uuidv4(),
//       clientDimensions: useClientDimensionsStore(),
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
.c-page {
  display: inline-block;
}

.c-page__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
