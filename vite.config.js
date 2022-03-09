import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv  } from 'vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
      include: ['schart.js']
    },
    resolve: {
      //配置根路径别名： import('@/pages/login/login.vue')
      alias: {
        "@": path.resolve(__dirname, "src"),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
    },
    server: {
      host: '0.0.0.0',  //配置host，0.0.0.0：时可以通过ip地址访问
      port: 8000,  // 配置启动端口
      open: true,  //项目启动自动在浏览器中打开
      https: false, //是否启用https
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})