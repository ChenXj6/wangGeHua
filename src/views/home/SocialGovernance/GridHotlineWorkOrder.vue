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
    <template v-slot:hotlineWorkOrderName='{data}'>
      <el-link
          type="success"
          @click.prevent="handleOperation(2, data)"
          >{{ data.hotlineWorkOrderName }}</el-link
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
import { renderTable } from './common/gridHotlineWorkOrder'
import PopupTreeInput from "@/components/PopupTreeInput/index.vue"
import { useRouter } from 'vue-router'
export default {
    name:'GridHotlineWorkOrder',
    components:{PopupTreeInput},
    setup() {
      const { proxy } = getCurrentInstance()
      const router = useRouter()
      const table = ref(null)
      const { tableConfig,formConfig } = renderTable.call(proxy)
      const searchForm = reactive({
        hotlineWorkOrderName:''
      })
      const handleReset = (formEL) => {
      formEL.resetFields()
      searchParams.value = {}
      defaultObject(searchForm)
      handleQuery()
    }
    const handleAdd = () => {
      handleOperation(3,{})
    }
      const formHandle = {
        btns: [
          {type:'primary',label:'查询',key:'search'},
          {type:'primary',label:'重置',key:'reset'},
          {type:'primary',label:'添加',key:'add',handle:handleAdd},
        ]
      }
      let searchParams = ref({}) // 表单数据备份

    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    
      // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: 'editOrder',
        query: { data : encodeURIComponent(data), operation: type},
      })
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res || []
        console.log(data,';;;')
        tableConfig.data = data
      })
    }
    onMounted(() => {
      handleQuery()
    })

    return {
      table,
      formConfig,
      tableConfig,
      searchForm,
      formHandle,
      handleOperation,
    }
    }
}
</script>