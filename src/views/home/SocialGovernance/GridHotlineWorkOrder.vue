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
          @click="handleOperation(2,data.data)"
          icon="el-icon-lx-edit"
          circle
          type="primary"
        ></el-button>
        <el-popconfirm title="确定要删除该类别吗？" @confirm="handleDelete(data.data)">
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
import { delTree } from '@/api/SocialGovernance/GridHotlineWorkOrder'
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
      const formHandle = {
        btns: [
          {type:'primary',label:'查询',key:'search',handle:handleQuery},
          {type:'primary',label:'重置',key:'reset',handle:handleReset},
          {type:'primary',label:'添加',key:'add',handle:handleAdd},
        ]
      }
      let searchParams = ref({}) // 表单数据备份

    
    
      // 查看/编辑
    const handleOperation = (type, rowData) => {
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editOrder',
        query: { data : encodeURIComponent(data), operation: type},
      })
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res || []
        tableConfig.data = data
      })
    }
    const handleDelete = ({id}) => {
      delTree({id}).then(res=>{
        if(res.resCode == '000000'){
          proxy.$message.success('类别删除成功')
          handleQuery()
        }
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
      handleDelete,
    }
    }
}
</script>