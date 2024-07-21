import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Notify } from "vant"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import { ConfigProvider } from 'vant'

// 引入样式文件
import "@/assets/css/index.scss"

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// app.use(ConfigProvider)
app.use(router)
app.use(Notify)
app.mount('#app')
