<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">党员类型统计</span>
      </template>
      <div class="itemBox">
        <div id="main1" ref="main1" style="width: 100%;height:160px;"></div>
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
const echartsData = ref([])
const drawEcharts = () => {
  myChart1.value = proxy.$echart.init(document.getElementById('main1'))
  // 饼图
  myChart1.value.setOption({
    legend: {
      orient: 'horizontal',
      bottom: '0',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}人 ({d}%)'
    },
    series: [
      {
        name: '人员占比',
        type: 'pie',
        radius: '50%',
        data: echartsData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 1,
            shadowOffsetX: 1,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
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
const getData = () => {
  getWg().then(res=>{
    if(res.resCode == '000000'){
      resetForm(res.data, echartsData)
    }
  })
}
// getData()
watch(()=>echartsData.value,()=>{
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
