<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">党员职称统计</span>
      </template>
      <div class="itemBox">
        <div id="main6" ref="main1" style="width: 100%;height:160px;"></div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, nextTick, onBeforeMount, onMounted, watch } from "@vue/runtime-core";
import { getWg } from '@/api/coclpit'

const { proxy } = getCurrentInstance()
let myChart1 = null
const echartsData = ref([
    { name: '局长', value: 1 },
    { name: '处长', value: 2 },
    { name: '科长', value: 3 },
    { name: '主任科员', value: 6 },
    { name: '巡视员', value: 10 },
    { name: '办事员', value: 12 },
    { name: '科员', value: 2 },
      ])
const drawEcharts = () => {
  myChart1 = proxy.$echart.init(document.getElementById('main6'))
  // 饼图
  myChart1.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}人 ({d}%)'
    },
  series: [
    {
      name: '党员职称',
      type: 'pie',
      top: '0',
      label: {
        alignTo: 'edge',
        formatter: '{b}\n{c} 人 {d}%',
        minMargin: 5,
        edgeDistance: 5,
      },
      labelLine:{
        length2: 5
      },
      radius: [20,70],
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 5
      },
      data: echartsData.value
    }
  ]
})
}
const resetForm = (data,option) => {
  let arr = []
  Object.keys(data).forEach(v=>{
    let obj = {}
    obj.name = v
    obj.value = data[v]
    arr.push(obj)
  })
  option.value = arr
}
// const getData = () => {
//   getWg().then(res=>{
//     if(res.resCode == '000000'){
      // resetForm(res.data, echartsData)
//     }
//   })
// }
// getData()
// watch(()=>echartsData.value,()=>{
//   drawEcharts()
// })
onMounted(()=>{
  drawEcharts()
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
