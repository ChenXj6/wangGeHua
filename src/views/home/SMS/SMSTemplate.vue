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
    >
    <template v-slot:mobile='{data}'>
      <el-link
          type="success"
          @click.prevent="handleOperation(1, data)"
          >{{ data.mobile }}</el-link
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
    </div>
</template>

<script>
import { getCurrentInstance, reactive, ref, onMounted, onBeforeMount } from '@vue/runtime-core'
import { deepClone, formatterDate, listAssign, defaultObject } from '@/utils/util'
import { renderTable } from './common/SMSTemplate'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { useRouter } from 'vue-router'
export default {
    name:'SMSList',
    components:{PopupTreeInput},
    setup() {
      const { proxy } = getCurrentInstance()
      const router = useRouter()
      const { tableConfig,formConfig } = renderTable.call(proxy)
      const searchForm = reactive({})
      const table = ref(null)
      let searchParams = ref({}) // 表单数据备份

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
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editSMS',
        query: { data : encodeURIComponent(data), operation: type,type:'temp'},
      })
    }
    const formHandle = {
        btns: [
          {type:'primary',label:'查询',key:'search',handle:handleQuery},
          {type:'primary',label:'重置',key:'reset',handle:handleReset},
          {type:'primary',label:'添加',key:'reset',handle:handleAdd},
        ]
      }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    onMounted(() => {
      // handleQuery()
    })

    return {
      table,
      handleOperation,
      formConfig,
      tableConfig,
      searchForm,
      formHandle,
    }
    }
}
</script>