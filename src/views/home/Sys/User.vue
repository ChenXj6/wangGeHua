<template>
  <div>
    <VForm
      :form-data="formConfig"
      :form-model="searchForm"
      :form-handle="formHandle"
    />
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:operation="data">
        <el-button
          size="small"
          @click="handleOperation(1, data.data)"
          icon="el-icon-lx-search"
          circle
          type="success"
        />
        <el-button
          size="small"
          icon="el-icon-lx-edit"
          @click="handleOperation(2, data.data)"
          circle
          type="primary"
        />
      </template>
    </V-table>
    <el-dialog
      :close-on-click-modal="false"
      :title="operation ? '新增' : '编辑'"
      v-model="dialogVisible"
      width="40%"
    >
      <VForm :form-data="addFormConfig" :form-model="dataForm" />
      <template #footer>
      <span class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false"
          >提交</el-button
        >
      </span>
    </template>
    </el-dialog>
  </div>
</template>
<script>

import { renderTable } from './common/User'
import { deepClone, formatterDate } from '@/utils/util'
import { getCurrentInstance, onMounted, reactive, ref } from '@vue/runtime-core'

export default {
  name: 'User',
  setup() {
    const { proxy }  = getCurrentInstance()
    const { tableConfig,formConfig,addFormConfig } = renderTable.call(proxy)
    const table = ref(null)
    let searchParams = ref({}) // 表单数据备份
    const searchForm = reactive({
      operatorName:'',
    })
    const dataForm = reactive({
      id: 0,
      operatorId: '',
      operatorName: '',
      deptId: '',
      deptName: '',
      roleId: '',
      roleName: '',
      email: '',
      mobile: '',
      status: 1,
    })
    const dialogVisible = ref(false)
    const operation = ref(false) // true:新增, false:编辑
    // 表單操作按鈕配置
    const handleAdd = () => {
      operation.value = false,
      addFormConfig.formItems.forEach(v=>{
        if(v.prop === 'deptId') {
          v.disabled = true
        }
      })
      dialogVisible.value = true
    }
    // 表格相關操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      for (const key in searchParams.value) {
        if (
          Array.isArray(searchParams.value[key]) &&
          searchParams.value[key].length > 0
        ) {
          searchParams.value[`${key}Start`] = formatterDate(
            searchParams.value[key][0]
          )
          searchParams.value[`${key}End`] = formatterDate(
            searchParams.value[key][1]
          )
          delete searchParams.value[key]
        }
      }
      table.currentPage = 1
      handleQueryTable()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.data || []
        tableConfig.data = data
      })
    }
    const formHandle = [
      {type:'primary',label:'查询',key:'search',handle:handleQuery},
      {type:'primary',label:'新增',key:'reset',handle:handleAdd},
    ]
    onMounted(() => {
      // handleQuery()
    })
    return {
      table,
      searchForm,
      formHandle,
      tableConfig,
      formConfig,
      dialogVisible,
      handleAdd,
      dataForm,
      addFormConfig,
      operation,
    }
  },
}
</script>
<style scoped></style>
