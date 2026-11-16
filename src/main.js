import { createApp } from 'vue'
import App from './App.vue'
import { vInView } from './composables/useInView'
import './assets/main.css'

createApp(App).directive('in-view', vInView).mount('#app')
