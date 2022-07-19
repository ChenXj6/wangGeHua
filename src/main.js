import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as echarts from 'echarts'
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);


import installElementPlus from '@/plugins/element'
import '@/assets/css/icon.css'


import VTable from '@/components/Table/index.vue'
import VForm from '@/components/Form/index.vue'
import VMap from '@/components/Map/index.vue'
import { DonMessage } from '@/utils/util'
// import websocket from '@/utils/webSocket'
import speak from '@/utils/speak'
import moment from 'moment'
import permission from '@/utils/permission'
import md5 from 'js-md5'


const app = createApp(App)

app.config.globalProperties.$moment = moment   // 时间处理插件
app.config.globalProperties.$message = DonMessage  // 消息提醒
app.config.globalProperties.$echart = echarts  // Echarts插件
app.config.globalProperties.$md5 = md5  // md5
app.config.globalProperties.$speak = speak   // 语音播报功能

console.log(`项目构建环境：${import.meta.env.MODE}`)
// console.log(`当前运行后台地址：${import.meta.env.VITE_APP_BASE_API }`)

installElementPlus(app)
permission(app)
app
  .use(store)
  .use(router)
  .component('VTable',VTable)
  .component('VForm',VForm)
  .component('VMap',VMap)
  .mount('#app')