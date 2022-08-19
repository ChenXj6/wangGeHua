<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="24">
        <VForm :form-data="PeopleTypeFormConfig" :form-model="searchForm" :form-handle="formHandle">
          <template v-slot:status>
            <popup-tree-input
                :data="popupTreeData" :propa="popupTreeProps"
                :nodeKey="''+searchForm.officeCode" @update:dataForm="handleTreeSelectChange">
                <template v-slot>
                  <el-input v-model="searchForm.officeName" size="small" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
                </template>
            </popup-tree-input>
          </template>
        </VForm>
      </el-col>
    </el-row>
    <el-row>&nbsp;</el-row>
    <el-row>
      <el-col :span="12">
        <div id="main" style="width: 100%;height:700px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="mainPin" style="width: 100%;height:700px;"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { getOrganList } from '@/api/sys/organ'
import { renderTable } from './common/search'
import { deepClone, defaultObject } from '@/utils/util'
export default {
  name: 'GridPeopleType',
  components:[PopupTreeInput],
  setup() {
    const myChart = ref(null)
    const myChartPin = ref(null)
    const { proxy } = getCurrentInstance()
    const { PeopleTypeFormConfig } = renderTable.call(proxy)
    const searchForm = ref({
      officeCode:'',
      officeName:'',
    })
    const searchParams = ref({})
    // 表格相關操作
    const handleQuery = () => {
      console.log('请求操作')
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
      ]
    }
    // 组织结构
    let popupTreeData = ref([])
    const popupTreeProps = {
      label: "officeName",
      children: "children"
    } 
    const getOList = () => {
      getOrganList({}).then(res=>{
        if(res.resCode == '000000'){
          popupTreeData.value = res.data
        }
      })
    }
    const handleTreeSelectChange = ({officeCode,officeName}) => {
      searchForm.value.officeCode = officeCode
      searchForm.value.officeName = officeName
    }
    getOList()
    onMounted(()=>{
      myChart.value =  proxy.$echart.init(document.getElementById('main'))
      myChartPin.value =  proxy.$echart.init(document.getElementById('mainPin'))
      // 绘制图表
      myChart.value.setOption({
        title: {
          text: '网格人员力量类型统计'
        },
        tooltip: {},
        xAxis: {
          data: ['网格书记', '网格长', '网格员', '帮包服务队']
        },
        yAxis: {},
        series: [
          {
            name: '人数以及人员类型',
            type: 'bar',
            data: [49, 26, 114, 70]
          }
        ]
      });
      // 饼图
      myChartPin.value.setOption({
        title: {
          text: '网格人员类型占比统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '人员占比',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 49, name: '网格书记' },
              { value: 26, name: '网格长' },
              { value: 114, name: '网格员' },
              { value: 70, name: '帮包服务队' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    })
    return{
      PeopleTypeFormConfig,
      searchForm,
      formHandle,
      popupTreeData,
      popupTreeProps,
      handleTreeSelectChange,
    }
  },
}
</script>
<style scoped>

</style>