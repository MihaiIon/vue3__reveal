import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
//
import router from '@/router'
import components from '@/components/index'
import iconComponents from '@/assets/icons/index'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

const allComponents = [...components, ...iconComponents]

allComponents.map(component => {
  app.component(component.name, component.component)
})

app.mount('#app')
