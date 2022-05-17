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
    <template v-slot:type="{data}">
      <span class="tagClass"
                ><el-button
                  size="mini"
                  :type="data.children ? 'info' : 'success'"
                  >{{ data.children ? '目录' : '菜单' }}</el-button
                ></span
              >
    </template>
      <template v-slot:operation="data">
        <el-button
          size="small"
          @click="handleEdit(data.data)"
          icon="el-icon-lx-edit"
          circle
          type="primary"
        ></el-button>
        <el-popconfirm title="确定要删除该角色吗？" @confirm="handleDelete(data.data)">
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
     <el-dialog
      :close-on-click-modal="false"
      :title="operation ? '新增' : '编辑'"
      v-model="dialogVisible"
      width="40%"
    >
      <VForm
        ref="form"
        :key="timer"
        :form-data="addFormConfig"
        :form-model="dataForm"
        :form-handle="AddFormHandle"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getCurrentInstance, reactive, ref, onMounted } from '@vue/runtime-core'
import { deepClone, formatterDate, listAssign, defaultObject } from '@/utils/util'

import { renderTable } from './common/Menu'
export default {
  name:'Menu',
  setup() {
    const { proxy } = getCurrentInstance()
    const { tableConfig, formConfig, addFormConfig } = renderTable.call(proxy)
    const table = ref(null)
    const form = ref(null)
    const timer = ref(new Date().getTime())
    let searchParams = ref({}) // 表单数据备份
    const searchForm = reactive({
      name:''
    })
    const dataForm = reactive({
      title:'',
      type: '',
      icon: '',
      parentName:'',
    })
    const dialogVisible = ref(false)
    const operation = ref(false) // true:新增, false:编辑
    // 表單操作按鈕配置
    const handleEdit = async (data) => {
      listAssign(dataForm, data)
      operation.value = false
      dialogVisible.value = true
    }
    const handleAdd = async () => {
      defaultObject(dataForm)
      dataForm.type = '2'
      operation.value = true
      dialogVisible.value = true
    }
    const handleDelete = (data) => {
      listAssign(dataForm, data)
      deleteRole(dataForm).then(res=>{
        res.code === 200 && (handleQuery(),proxy.$message.success('用户删除成功。'))
      })
    }
    // 表格操作
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        // const data = res.content || []
        tableConfig.data = res
      })
    }
    // 表单按钮组
    const formHandle = {
      span: 4,
      btns: [
        { type: 'primary', label: '查询', key: 'search', handle: handleQuery },
        { type: 'primary', label: '新增', key: 'add', handle: handleAdd },
      ],
    }
    const handleSave = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (operation.value) {
            
          } else {
            
          }
        } else {
          return
        }
      })
    }
    const AddFormHandle = {
      span: 23,
      textAlign: 'right',
      btns: [
        {
          type: 'default',
          label: '取消',
          key: 'search',
          handle: () => (dialogVisible.value = false),
        },
        { type: 'primary', label: '提交', key: 'add', handle: handleSave },
      ],
    }
    onMounted(() => {
      handleQuery()
    })
    return {
      form,
      timer,
      table,
      formConfig,
      tableConfig,
      addFormConfig,
      searchForm,
      dataForm,
      formHandle,
      AddFormHandle,
      handleEdit,
      handleDelete,
      dialogVisible,
      operation,
    }
  },
}
</script>
<style scoped>
.tagClass {
  height: 30px;
  transform: scale(0.8);
}
</style>