import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'


import { DonMessage } from '@/utils/util'
// import websocket from '@/utils/webSocket'
import speak from '@/utils/speak'
import moment from 'moment'
import permission from '@/utils/permission'


const app = createApp(App)

app.config.globalProperties.$moment = moment   // 时间处理插件
app.config.globalProperties.$message = DonMessage  // 消息提醒
app.config.globalProperties.$echart = echarts  // Echarts插件
app.config.globalProperties.$speak = speak   // 语音播报功能
// app.config.globalProperties.$ws = websocket

console.log(`项目构建环境：${import.meta.env.MODE}`)
// console.log(`当前运行后台地址：${import.meta.env.VITE_APP_BASE_API }`)

installElementPlus(app)
permission(app)
app
  .use(store)
  .use(router)
  .mount('#app')