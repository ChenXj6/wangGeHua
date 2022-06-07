<template>
  <div>
    <VForm :form-data="formConfig" :form-model="searchForm" :form-handle="formHandle"/>
    <V-table
      ref="table"
      :table-config="tableConfig"
      @select-change="(val) => (multipleSelection = val)"
    >
      <template v-slot:name="data">
        <el-link
          type="success"
          @click.prevent="handleOperation(1, data.data)"
          >{{ data.data.eventName }}</el-link
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
          icon="el-icon-lx-forwardfill"
          circle
          type="priamry"
        />
        <!-- @click="handleOperation(2, data.data)" -->
        <el-button
          size="small"
          icon="el-icon-lx-lock"
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

import { renderTable } from './common/eventHandle'
import { deepClone, formatterDate } from '@/utils/util'

export default defineComponent({
  name: 'residentsReport',
  setup() {
    const router = useRouter()
    const { proxy } = getCurrentInstance()
    const { tableConfig,formConfig } = renderTable.call(proxy)
    const table = ref(null)
    const searchForm = reactive({
      date: []
    }) // 表单数据
    let searchParams = ref({}) // 表单数据备份
    const multipleSelection = ref([]) // 选中数据
    // 是否有選中數據
    const isHaveSelect = computed(
      () => multipleSelection.value && multipleSelection.value.length > 0
    )

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
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchForm.value = {}
      searchParams.value = {}
      handleQuery()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchParams.value, (res) => {
        const data = res.list || []
        tableConfig.data = data
      })
    }
    // 表單操作按鈕配置
    const formHandle = {
      btns: [
        {type:'primary',label:'查询',key:'search',handle:handleQuery},
        {type:'primary',label:'重置',key:'reset',handle:handleReset},
      ]
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
      let data = JSON.stringify(rowData)
      router.push({
        path: '/editResidentsReport',
        query: { data: encodeURIComponent(data), operation: type },
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
      multipleSelection,
      tableConfig,
      formConfig,
      searchForm,
      formHandle,
      handleQuery,
      handleReset,
      handleOperation,
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
