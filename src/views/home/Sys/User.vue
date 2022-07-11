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
          @click="handleEdit(data.data)"
          icon="el-icon-lx-edit"
          circle
          type="success"
        />
        <el-button size="small" circle type="primary" @click="handleCommand(data.data)"><i class="el-icon-lx-people"></i></el-button>
        <el-popconfirm title="确定要删除该用户吗？" @confirm="handleDelete(data.data.operatorId)">
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
import { renderTable } from './common/User'
import { deepClone, formatterDate } from '@/utils/util'
import { getCurrentInstance, onMounted, reactive, ref } from '@vue/runtime-core'

import { saveUser, deleteUser } from '@/api/sys/user.js'
import { listAssign, defaultObject } from '@/utils/util'
import { useRouter } from 'vue-router'

export default {
  name: 'User',
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { tableConfig, formConfig, addFormConfig } = renderTable.call(proxy)
    const table = ref(null)
    const form = ref(null)
    const timer = ref(new Date().getTime())
    let searchParams = ref({}) // 表单数据备份
    const searchForm = reactive({
      operatorName: '',
      operatorId: '',
    })
    let dataForm = reactive({
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
    // 根据添加、编辑不同的需求变换 disabled
    const wholeDisabled = (arr) => {
      return new Promise((resolve) => {
        addFormConfig.formItems.forEach((v) => {
          if (arr.length && arr.includes(v.prop)) {
            v.disabled = true
          } else {
            v.disabled = false
          }
        })
        resolve(true)
      })
    }
    const handleEdit = async (data) => {
      let disabledArr = ['operatorId', 'operatorName']
      await wholeDisabled(disabledArr)
      listAssign(dataForm, data)
      timer.value = new Date().getTime() // 利用组件key来实现实时刷新组件
      operation.value = false
      dialogVisible.value = true
    }
    const handleSave = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          saveUser(dataForm).then((res) => {
            if (res.code === 200) {
              proxy.$message.success('操作成功')
              handleQuery()
              dialogVisible.value = false
            }
          })
        } else {
          return
        }
      })
    }
    const handleDelete = (operatorId) => {
      deleteUser({operatorId}).then(res=>{
        handleQuery()
        proxy.$message.success('用户删除成功。')
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

    const handleAdd = async () => {
      await wholeDisabled([])
      defaultObject(dataForm)
      timer.value = new Date().getTime()
      operation.value = true
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
        const data = res.list || []
        tableConfig.data = data
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
    // 
    const handleCommand = (rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/distribution',
        query: { data: encodeURIComponent(data), operation: 2,type:'user' },
      })
    };
    onMounted(() => {
      handleQuery()
    })
    return {
      table,
      form,
      searchForm,
      formHandle,
      tableConfig,
      formConfig,
      dialogVisible,
      dataForm,
      addFormConfig,
      operation,
      timer,
      handleEdit,
      handleDelete,
      AddFormHandle,
      handleCommand,
    }
  },
}
</script>
<style scoped></style>
