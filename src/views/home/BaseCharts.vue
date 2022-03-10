<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-pie-chart"></i> schart图表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="plugins-tips">
        vue-schart：vue.js封装sChart.js的图表组件。
        访问地址：
        <a href="https://github.com/lin-xin/vue-div"
           target="_blank">vue-div</a>
      </div>
      <div class="div-box">
        <div class="content-title">柱状图</div>
        <div class="div"
             ref="bar"></div>
      </div>
      <div class="div-box">
        <div class="content-title">折线图</div>
        <div class="div"
             ref="line"></div>
      </div>
      <div class="div-box">
        <div class="content-title">饼状图</div>
        <div class="div"
             ref="pie"></div>
      </div>
      <div class="div-box">
        <div class="content-title">环形图</div>
        <div class="div"
             ref="ring"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core';
export default {
  name: "basecharts",
  setup () {
    const bar = ref(null)
    const line = ref(null)
    const pie = ref(null)
    const ring = ref(null)
    const { proxy } = getCurrentInstance()
    const initEchart = (el) => {
      const echart = proxy.$echart.init(el.value)
      echart.setOption({
        title: {
          // text: 'Stacked Line',
          top: '5%'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient : 'horizontal',
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '0',
          bottom: '0',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: ['20%','20%'],
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'bar',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    }
    onMounted(() => {
      initEchart(line)
    })
    return {
      bar,
      pie,
      line,
      ring,
    };
  },
};
</script>

<style scoped>
.div-box {
  display: inline-block;
  margin: 20px;
}
.div {
  width: 600px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>