import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts';
import installElementPlus from './plugins/element'
// import Bus from '@/utils/bus.js'
import './assets/css/icon.css'
import { DonMessage } from '@/utils/util'

import speak from '@/utils/speak'


const app = createApp(App)
// 自定义权限指令
import per from '@/utils/permission'
per(app)

// Vue.config.globalProperties.$bus = Bus
import moment from 'moment'
app.config.globalProperties.$moment = moment
app.config.globalProperties.$message = DonMessage
app.config.globalProperties.$echart = echarts
app.config.globalProperties.$speak = speak

console.log(`当前运行环境：${import.meta.env.MODE }`)
console.log(`当前运行后台地址：${import.meta.env.VITE_APP_BASE_API }`)

installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')