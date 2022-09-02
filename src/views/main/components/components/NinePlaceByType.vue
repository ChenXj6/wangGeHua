<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">九小场所统计</span>
      </template>
      <div class="itemBox">
        <div id="main10" ref="main1" style="width: 100%;height:160px;"></div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { getCurrentInstance, nextTick, onBeforeMount, onMounted, watch } from "@vue/runtime-core";
import { getWg } from '@/api/coclpit'

const { proxy } = getCurrentInstance()
const myChart1 = ref(null)
const echartsData = ref([
        { value: 10, name: '小购物场所' },
        { value: 25, name: '小餐饮场所' },
        { value: 25, name: '小住宿场所' },
        { value: 15, name: '小公共娱乐场所' },
        { value: 35, name: '小休闲健身场所' },
        { value: 35, name: '小医疗场所' },
        { value: 22, name: '小教学场所' },
        { value: 55, name: '小生产加工企业' },
      ])
const drawEcharts = () => {
  myChart1.value = proxy.$echart.init(document.getElementById('main10'))
  // 饼图
  myChart1.value.setOption({
    tooltip: {
      trigger: 'item',
      // position:'right',
      formatter: '{b} : <br/>{c}个 ({d}%)'
    },
  series: [
    {
      name: '税收类型',
      type: 'pie',
      top: '10%',
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      label: {
        position: 'outer',
        alignTo: 'labelLine',
        bleedMargin: 20,
        formatter: '{b}:\n{c}个 {d}%'
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
