<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle">
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
    <V-table
      ref="table"
      :table-config="tableConfig"
    >
    <template v-slot:operation="{data}">
        <el-button
          icon="edit"
          @click="handleOperation(false, data)"
          circle
          type="primary"
        />
        <el-popconfirm title="确定要删除吗？" @confirm="handleDel(data.id)">
          <template #reference>
            <el-button
              icon="delete"
              circle
              type="danger"
            />
          </template>
        </el-popconfirm>
      </template>
    </V-table>
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
import { renderTable } from './common/daily'
import { deepClone, defaultObject,formatterDate } from '@/utils/util'



const { proxy } = getCurrentInstance()
const { tableConfig,formConfig } = renderTable.call(proxy)
const searchForm = ref({})
const searchParams = ref({})
// 表格相關操作
const table = ref(null)
const handleQuery = () => {
  searchParams.value = deepClone(searchForm.value)
  for (const key in searchParams.value) {
    if (
      Array.isArray(searchParams.value[key]) &&
      searchParams.value[key].length > 0
    ) {
      searchParams.value[`begin${key}`] = formatterDate(
        searchParams.value[key][0]
      )
      searchParams.value[`end${key}`] = formatterDate(
        searchParams.value[key][1]
      )
      delete searchParams.value[key]
    }
    if(Array.isArray(searchParams.value[key]) &&
      searchParams.value[key].length == 0){
        delete searchParams.value[key]
    }
  }
  table.currentPage = 1
  handleQueryTable()
}
const handleReset = (formEL) => {
  formEL.resetFields()
  searchParams.value = {}
  defaultObject(searchForm.value)
  handleQuery()
}
const formHandle = {
  btns: [
    {type:'primary',label:'查询',key:'search',handle:handleQuery},
    {type:'primary',label:'重置',key:'reset',handle:handleReset},
  ]
}
const handleQueryTable = () => {
  table.value.getTableData(searchParams.value, (res) => {
    const data = res.list || []
    tableConfig.data = data
  })
}
onMounted(()=>{
  handleQuery()
})

</script>