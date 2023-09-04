import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/big-screen-1/',
  resolve: {
    alias: [ // 配置 @ 指代 src
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      }
    ],
  },
  server: {
    // 开启热更新
    hmr: true
  }
})
