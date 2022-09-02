<template>
  <div class="partymembersBox">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <span class="fontTitle">党员学历分析</span>
      </template>
      <div class="itemBox">
        <div id="main3" ref="main1" style="width: 100%;height:160px;"></div>
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
        { value: 1048, name: '高中及以下' },
        { value: 735, name: '专科' },
        { value: 580, name: '本科' },
        { value: 484, name: '研究生' },
        { value: 300, name: '博士生' }
      ])
const drawEcharts = () => {
  myChart1.value = proxy.$echart.init(document.getElementById('main3'))
  // 饼图
  myChart1.value.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}人 ({d}%)'
    },
  series: [
    {
      name: '学历',
      type: 'pie',
      top: '0',
      label: {
        normal: {
          show: true,
          formatter: function(v) { //让series 中的文字进行换行
            //文字中遇到空格就换行,让value换行可以先把value变成字符串再slice操作
            let text = v.name.split(" ").join("\n") + ':\n' + v.value + "人 ";
            return text;
          }
        }
      },
      radius: ['30%','80%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      // label: {
      //   show: true,
      // },
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
