import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes.js'

createApp(App)
  .use(router)
  .mount('#app')
