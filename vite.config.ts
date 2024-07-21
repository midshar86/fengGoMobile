import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import Components from "unplugin-vue-components/vite"
// 引入 vant 组件库功能
import { VantResolver } from "unplugin-vue-components/resolvers"
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src'],
      extensions: ['vue'],
      deep: true,
      // 注册 Vant 组件库
      resolvers: [VantResolver()],
      dts: "src/components.d.ts"
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
