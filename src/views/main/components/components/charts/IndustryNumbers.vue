<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">产业信息数量统计</span>
      </template>
      <div class="itemBox">
        <div id="main14" ref="main14" style="width: 100%;height:160px;"></div>
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
  myChart1 = proxy.$echart.init(document.getElementById('main14'))
  // 饼图
  myChart1.setOption({
  grid: {
    top:'20%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{a} <br/>{b} : {c}个',
    axisPointer:{
      type: 'shadow'
    }
  },
  xAxis: {
    type: 'category',
    data: ['第一产业', '第二产业', '第三产业']
  },
  yAxis: {
    type: 'value',
    name:'数量',
  },
  series: [
    {
      name:'数量',
      data: [120, 270, 150],
      type: 'bar',
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
