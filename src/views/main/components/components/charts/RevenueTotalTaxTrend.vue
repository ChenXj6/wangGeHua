<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">近5年税收趋势分析</span>
      </template>
      <div class="itemBox">
        <div id="main7" ref="main1" style="width: 100%;height:160px;"></div>
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
  myChart1 = proxy.$echart.init(document.getElementById('main7'))
  myChart1.setOption({
  grid: {
    top:'20%',
    left: '3%',
    right: '10%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}年份<br/>{a}\n{c} 万元',
  },
  xAxis: {
    type: 'category',
    data: ['2018', '2019', '2020', '2021', '2022']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 万元',
      show:true,
    },
  },
  series: [
      {
          name: '税收金额',
          type: 'line',
          data: [224, 218, 135, 147, 260],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          label:{
            show:true,
            position:'bottom'
          }
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
