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
        <div id="main" style="width: 100%;height:700px;"></div>
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
      // 绘制图表
      myChart.value.setOption({
        title: {
          text: '事项处置效率排名',
          subtext:'完成数/总数',
        },
        tooltip: {},
        xAxis: {
          data: ['东区社区', '西区社区', '南区社区', '北区社区','泉星社区','绿地社区'],
          min:0,
        },
        legend: [
          {
            name:'总数量',
          },
          {
            name:'已完成',
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '处理数量',
          }
        ],
        series: [
          {
            name: '总数量',
            type: 'bar',
            data: [2, 18, 8, 3,0,0]
          },
          {
            name: '已完成',
            type: 'bar',
            data: [0, 18, 5, 0,0,0]
          }
        ]
      });
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