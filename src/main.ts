import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'

import './assets/main.css'

const app = createApp(App)

app.directive('reveal', vReveal)

app.use(createPinia())
app.use(router)

app.mount('#app')
