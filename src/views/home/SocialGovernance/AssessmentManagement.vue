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
    <template v-slot:operation="{data}">
        <el-tooltip
        class="box-item"
        effect="dark"
        content="查看"
        placement="top-start"
      >
        <el-button
          size="small"
          @click="handleOperation(1, data)"
          icon="el-icon-lx-search"
          circle
          type="success"
        />
         </el-tooltip>
        <el-tooltip
        class="box-item"
        effect="dark"
        content="编辑"
        placement="top-start"
      >
        <el-button
          size="small"
          icon="el-icon-lx-edit"
          @click="handleOperation(2, data)"
          circle
          type="priamry"
        />
        </el-tooltip>
        <el-popconfirm title="确定要删除吗？" @confirm="handleDel(data.id)">
          <template #reference>
            <el-button
              size="small"
              icon="el-icon-lx-delete"
              circle
              type="danger"
            />
          </template>
        </el-popconfirm>
      </template>
    </V-table>
  </div>
</template>
<script>
import { reactive, ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch,
} 
from '@vue/runtime-core'
import { renderTable } from './common/AssessmentManagement'
import { deepClone, defaultObject } from '@/utils/util'
import { deleteAssessmentManagement } from '@/api/SocialGovernance/AssessmentManagement'
export default defineComponent({
    name: 'AssessmentManagement',
    setup(){
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({}) // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const multipleSelection = ref([]) // 选中数据 

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
    const handleAdd = () => {
      handleOperation(3,{})
    }
    const handleDel = (id) => {
      deleteAssessmentManagement({id}).then(res=>{
        if(res.resCode == '000000'){
          handleQuery()
          proxy.$message.success('删除数据成功')
        }else{
          proxy.$message.danger('删除数据失败')
        }
      })
    }

     const handleQueryTable = () => {
    //   table.value.getTableData(searchParams.value, (res) => {
    //     const data = res.list || []
    //     tableConfig.data = data
    //   })
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
        {type:'primary',label:'添加',key:'reset',handle:handleAdd},
      ]
    }
    
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
    //   router.push({
    //     path: '/EditAssessmentManagement',
    //     query: { data : encodeURIComponent(data), operation: type},
    //   })
    }

      onMounted(() => {
      handleQuery()
    })

    return {
      table,
      multipleSelection,
      tableConfig,
      formConfig,
      searchForm,
      formHandle,
      handleQuery,
      handleReset,
      handleOperation,
      handleDel,
    }
    }
})
</script>
        