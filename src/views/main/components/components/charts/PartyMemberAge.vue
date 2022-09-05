<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">党员年龄分布</span>
      </template>
      <div class="itemBox">
        <div id="main2" ref="main1" style="width: 100%;height:160px;"></div>
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
  myChart1 = proxy.$echart.init(document.getElementById('main2'))
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
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}人'
  },
  xAxis: {
    type: 'category',
    data: ['35及以下', '36-45', '46-54', '55-59', '60及以上']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name:'男',
      stack: 'sex',
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
    },
    {
      name:'女',
      stack: 'sex',
      data: [120, 200, 150, 80, 70, 110],
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
    }
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
