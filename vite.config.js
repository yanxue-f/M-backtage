import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //第二种配合koa mock数据 代理服务器
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:1991',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }

  //   }
  // }
  //package.json中配置同时启动vite 和 代理服务api
  // "dev": "concurrently \"vite\" \"npm run server:mock\"",
  // "server:mock": "node ./mock/koa_mock.js",
  
  //配置环境变量管理开发和生产环境下通过 import.meta.env获取环境变脸的前缀
  envPrefix:'ZMKT_'
})
