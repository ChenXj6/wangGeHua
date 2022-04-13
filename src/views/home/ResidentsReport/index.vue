<template>
  <div>
    <VForm :form-data="formConfig" @reset="handleReset" @search="handleQuery"/>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:name="data">
        <el-link
          type="success"
          @click.prevent="handleOperation(1, data.data)"
          >{{ data.data.name }}</el-link
        >
      </template>
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
          type="priamry"
        />
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
} from '@vue/runtime-core'

import { renderTable } from './common/taxesTableHeader'
import { deepClone } from '@/utils/util'

export default defineComponent({
  name: 'residentsReport',
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const tableData = [
      {
        date: '1649662472313',
        name: 'Tom',
        isNew: 1,
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '1649662472313',
        name: 'Jerry',
        isNew: 2,
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '1649662472313',
        name: 'Sam',
        isNew: '',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '1649662472313',
        name: 'Timi',
        isNew: 2,
        address: 'No. 189, Grove St, Los Angeles',
      },
    ]
    let searchParams = ref({})
    const multipleSelection = ref([])
    const isHaveSelect = computed(
      () => multipleSelection.value && multipleSelection.value.length > 0
    )

    // 表格查询
    const handleQuery = (form) => {
      searchParams.value = deepClone(form)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = () => {
      searchParams.value = {}
      handleQuery()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.data || []
        tableConfig.data = data
      })
    }

    //
    // 改变table行样式
    const tableRowClassName = ({ row }) => {
      if (row.isNew === 1) {
        return 'warning-row'
      } else if (row.isNew === 2) {
        return 'danger-row'
      } else return ''
    }
    // 查看/编辑
    const handleOperation = (type, rowData) => {
      router.push({
        path: '/editResidentsReport',
        query: { id: rowData.isNew, operation: type },
      })
    }

    onBeforeMount(() => {
      tableConfig.rowClassFunc = tableRowClassName //  表格样式
    })
    onMounted(() => {
      handleQuery()
    })
    return {
      table,
      tableData,
      multipleSelection,
      tableConfig,
      handleOperation,
      handleQuery,
      handleReset,
      formConfig,
    }
  },
})
</script>
<style scoped>
:deep(.el-table .warning-row) {
  background: #e6a23c;
}

:deep(.el-table .danger-row) {
  background: orangered;
}
</style>
