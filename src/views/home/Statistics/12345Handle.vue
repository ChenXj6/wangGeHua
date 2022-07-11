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
                  <el-input v-model="searchForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
                </template>
            </popup-tree-input>
          </template>
        </VForm>
      </el-col>
    </el-row>
    <el-row>&nbsp;</el-row>
    <el-row>
      <el-col :span="24">
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
    const myChartPin = ref(null)
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
      myChartPin.value =  proxy.$echart.init(document.getElementById('mainPin'))
      // 饼图
      myChartPin.value.setOption({
        title: {
          text: '南村街道12345热线办理比例分析图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            label: {
                normal: {
                    show: true,
                    formatter: '{b}: {c}件({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
                }
            },
            data: [
              { value: 2138, name: '城乡建设' },
              { value: 420, name: '社会事业' },
              { value: 2812, name: '城市综合' },
              { value: 39, name: '三农问题' },
              { value: 179, name: '人力资源保障' },
              { value: 139, name: '经济综合' },
              { value: 32, name: '其他' },
              { value: 501, name: '疫情防控' },
              { value: 0, name: '城市更新' },
              { value: 13, name: '自然资源' },
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