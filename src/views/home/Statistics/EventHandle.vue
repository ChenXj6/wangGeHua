<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="24">
        <VForm :form-data="EventHandleFormConfig" :form-model="searchForm" :form-handle="formHandle">
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
      <el-col :span="24">
        <div id="main" style="width: 100%;height:700px;"></div>
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
    const { proxy } = getCurrentInstance()
    const { EventHandleFormConfig } = renderTable.call(proxy)
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
        tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      calculable: true,
      legend: {
        data: ['总数量', '已完成'],
        itemGap: 5
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['网格书记', '网格长', '网格员', '帮包服务队']
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '处理数量',
          axisLabel: {
            formatter: function (a) {
              a = +a;
              return isFinite(a) ? proxy.$echart.format.addCommas(+a / 1000) : '';
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          start: 94,
          end: 100
        },
        {
          type: 'inside',
          start: 94,
          end: 100
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%'
        }
      ],
      series: [
        {
          name: 'Budget 2011',
          type: 'bar',
          data: [0,0,0,0,0]
        },
        {
          name: 'Budget 2012',
          type: 'bar',
          data: [0,0,0,0,0]
        }
      ]
      });
    })
    return{
      EventHandleFormConfig,
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