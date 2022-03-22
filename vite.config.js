import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import path, { resolve } from "path";
import viteCompression from 'vite-plugin-compression';
import vueJsx from '@vitejs/plugin-vue-jsx'
// 在这里祝福还在非被迫情况下坚持使用IE和旧版chrome的人____,使用落后产品上瘾吗?
import legacyPlugin from '@vitejs/plugin-legacy'  // 兼容处理

// 按需引入组件
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: './',
    plugins: [
      vue(),
      viteCompression({ //gzip静态资源压缩
        verbose: true,    // 默认即可
        disable: false,  //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 10240, //压缩前最小文件大小
        algorithm: 'gzip',  //压缩算法
        ext: '.gz', //文件类型
      }),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      legacyPlugin({
        targets: ['chrome 52', 'ie >= 11'], // 需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
      }),
    ],
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
    },
    // 打包配置
    build: {
      // 清除console和debugger
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        output: {
          // 去掉注释内容
          comments: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks (id) { //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
          // manualChunks: {
          //   // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
          //   vue: ['vue', 'vue-router', 'vuex'],
          //   echarts: ['echarts'],
          // },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
      brotliSize: false,
    }
  }
})