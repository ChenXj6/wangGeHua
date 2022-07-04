<template>
  <div class="main">
    <el-row :gutter="10">
      <el-col :span="24">
        <VForm :form-data="weeklyFormConfig" :form-model="searchForm" :form-handle="formHandle">
          <!-- <template v-slot:status>
            <popup-tree-input
                :data="popupTreeData" :propa="popupTreeProps"
                :nodeKey="''+searchForm.officeCode" @update:dataForm="handleTreeSelectChange">
                <template v-slot>
                  <el-input v-model="searchForm.officeName" size="mini" :readonly="true" placeholder="点击选择机构" style="cursor:pointer;"></el-input>
                </template>
            </popup-tree-input>
          </template> -->
        </VForm>
      </el-col>
    </el-row>
    <el-row>&nbsp;</el-row>
    <el-row>
    <V-table
      ref="table"
      :table-config="weeklyTableConfig"
    />
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
    const { proxy } = getCurrentInstance()
    const { weeklyTableConfig,weeklyFormConfig } = renderTable.call(proxy)
    const searchForm = ref({
      officeCode:'',
      officeName:'',
    })
    const table = ref(null)
    const searchParams = ref({})
    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleExport = () => {
      console.log('导出表格')
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
        {type:'success',label:'导出表格',key:'reset',handle:handleExport},
      ]
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        weeklyTableConfig.data = []
      })
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
      handleQuery()
    })
    return{
      weeklyFormConfig,
      weeklyTableConfig,
      searchForm,
      table,
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