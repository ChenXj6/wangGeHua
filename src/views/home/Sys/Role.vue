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
      @row-click="handleRowClick"
    >
      <template v-slot:operation="data">
        <el-button
          size="small"
          @click="handleEdit(data.data)"
          icon="el-icon-lx-edit"
          circle
          type="primary"
        ></el-button>
        <el-button size="small" circle type="primary" @click="handleCommand(data.data)"><i class="el-icon-lx-tag"></i></el-button>
        
        <el-popconfirm title="确定要删除该角色吗？" @confirm="handleDelete(data.data.id)">
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
        :form-data="addFormConfig"
        :form-model="dataForm"
        :form-handle="AddFormHandle"
      />
    </el-dialog>
  </div>
</template>
<script>
import { renderTable } from './common/Role'
import { deepClone, formatterDate, listAssign, defaultObject } from '@/utils/util'
import { getCurrentInstance, onMounted, reactive, ref } from '@vue/runtime-core'

import { saveRole, editRole, deleteRole } from '@/api/sys/role'
import { items } from '@/config/menu'
import _Row from 'element-plus/lib/el-row'
import { useRouter } from 'vue-router'

export default {
  name: 'Role',
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const { tableConfig, formConfig, addFormConfig } = renderTable.call(proxy)
    const table = ref(null)
    const form = ref(null)
    let searchParams = ref({}) // 表单数据备份
    const searchForm = reactive({
      name:''
    })
    const treeRef = ref(null)
    const isCheckAll = ref(false)
    const checkAll = () => {
      if (isCheckAll.value) {
        treeRef.value.setCheckedNodes(items)
      } else {
        treeRef.value.setCheckedNodes([])
      }
    }
    const handleResetTree = () => {
      isCheckAll.value = false
      checkAll()
    }
    const dataForm = reactive({
      id:'',
      name: '',
      remark: '',
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
      operation.value = true
      dialogVisible.value = true
    }
    const handleDelete = (id) => {
      deleteRole({id}).then(res=>{
        res.code === 200 && (handleQuery(),proxy.$message.success('用户删除成功。'))
      })
    }
    // 表格行点击相關操作
    const handleRowClick = (val) => {
      // console.log(val)
    }
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
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
    const handleSave = (formRef) => {
      formRef.validate((valid) => {
        if (valid) {
          if (operation.value) {
            saveRole(dataForm).then((res) => {
              if (res.code === 200) {
                proxy.$message.success('角色添加成功！')
                handleQuery()
                dialogVisible.value = false
              }else if (res.code == 500){
                proxy.$message.warning(res.msg)
                dialogVisible.value = false
              }
            })
          } else {
            editRole(dataForm).then((res) => {
              if (res.code === 200) {
                proxy.$message.success('角色修改成功！')
                handleQuery()
                dialogVisible.value = false
              }else if (res.code == 500){
                proxy.$message.warning(res.msg)
                dialogVisible.value = false
              }
            })
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
    // 
    const handleCommand = (rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/distribution',
        query: { data: encodeURIComponent(data), operation: 2,type:'role' },
      })
    };
    const handleData = (rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/distribution',
        query: { data: encodeURIComponent(data), operation: 2,type:'data' },
      })
    }
    onMounted(() => {
      handleQuery()
    })
    return {
      table,
      handleRowClick,
      form,
      searchForm,
      treeRef,
      items,
      isCheckAll,
      checkAll,
      handleResetTree,
      // renderContent,
      formHandle,
      tableConfig,
      formConfig,
      dialogVisible,
      dataForm,
      addFormConfig,
      operation,
      AddFormHandle,
      handleEdit,
      handleDelete,
      handleCommand,
      handleData,
    }
  },
}
</script>
<style scoped>
.menu-header {
  padding-left: 8px;
  padding-bottom: 5px;
  text-align: left;
  font-size: 16px;
  color: rgb(20, 89, 121);
}
.custom-tree-node {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.custom-tree-node > span {
  min-width: 100px;
}
.tagClass {
  height: 30px;
  transform: scale(0.8);
}
.footerClass {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
