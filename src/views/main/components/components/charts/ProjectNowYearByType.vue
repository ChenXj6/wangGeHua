<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">本年项目按类型</span>
      </template>
      <div class="itemBox">
        <div id="main11" ref="main10" style="width: 100%;height:160px;"></div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, nextTick, onBeforeMount, onMounted } from "@vue/runtime-core";

const { proxy } = getCurrentInstance()
// const myChart1 = ref(null)
let myChart1 = null
const drawEcharts = () => {
  myChart1 = proxy.$echart.init(document.getElementById('main11'))
  // 饼图
  myChart1.setOption({
  grid: {
    top:'20%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  legend: {
    type:'scroll',
    show:true
  },
  tooltip: {
    show:true,
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['内资项目', '外资项目', '重点项目']
  },
  yAxis: [
    {
      type: 'value',
      name: '数量',
      min: 0,
      max:40,
      interval: 10,
      axisLabel: {
        formatter: '{value}'
      }
    },
    {
      type: 'value',
      name: '金额(万元)',
      min: 0,
      max: 100,
      interval: 10,
      axisLabel: {
        formatter: '{value}'
      }
    }
  ],
  series: [
    {
      name:'项目数量',
      data: [5, 20, 36],
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 个';
        }
      },
      label:{
        show:true,
      }
    },
    {
      name:'项目金额',
      data: [15, 30, 29],
      type: 'line',
      smooth: true,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 万元';
        }
      },
      label:{
        show:true,
        position:'top'
      }
    }
  ]
})
}
// onBeforeMount(()=>{
  nextTick(()=>{
    drawEcharts()
  })
// })
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
