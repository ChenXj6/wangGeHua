<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">本年度党员新增统计</span>
      </template>
      <div class="itemBox">
        <div id="main5" ref="main5" style="width: 100%;height:160px;"></div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, nextTick, onBeforeMount, onMounted } from "@vue/runtime-core";

const { proxy } = getCurrentInstance()
let myChart1 = null
const drawEcharts = () => {
  myChart1 = proxy.$echart.init(document.getElementById('main5'))
  myChart1.setOption({
  grid: {
    top:'10px',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  // legend: {
  //   type:'plain',
  //   show:true
  // },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月','6月', '7月', '8月', '9月', '10月','11月','12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name:'新增',
      data: [320, 332, 301, 334, 490, 330, 320,150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      emphasis: {
        focus: 'series'
      },
    },
  ]
})
}
onBeforeMount(()=>{
  nextTick(()=>{
    drawEcharts()
  })
})
</script>
<style scoped>
.partymembersBox{
  height: 200px;
  /* height: 120px; */
  margin-bottom: 10px;
  font-size: 14px;
}
.box-card{
  height: 100%;
}
:deep().el-card .el-card__header,:deep().el-card .el-card__body {
  padding: 5px 10px !important;
}
:deep().el-card .el-card__body{
  height: 80px;
}
.fontWeight{
  font-weight: 700;
  font-size: 28px;
}
.fontTitle{
  font-weight: 700;
  color:#73767a ;
}
.itemBox{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
