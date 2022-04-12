<template>
  <div>
    <el-form ref="form" :model="searchForm" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="工单号" prop="entryId">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件名称">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发生时间">
            <el-date-picker
              v-model="searchForm.entryId"
              type="datetimerange"
              range-separator="至"
              size="small"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件状态">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件类型">
            <el-select
              v-model="searchForm.region"
              size="small"
              placeholder="请选择事件类型"
              clearable
            >
              <el-option label="Zone one" value="1" />
              <el-option label="Zone two" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件查询">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="事件来源">
            <el-input
              v-model="searchForm.entryId"
              placeholder="请输入"
              size="small"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="btn-box">
            <el-button type="primary" size="small" @click="handleQuery"
              >查询</el-button
            >
            <el-button type="primary" size="small" @click="handleReset(form)"
              >重置</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-form>
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
import { get } from '@/api/index'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  watch,
} from '@vue/runtime-core'

import { renderTable } from './common/taxesTableHeader'
import VTable from '@/components/Table/index.vue'
import { deepClone } from '@/utils/util'

export default defineComponent({
  name: 'residentsReport',
  components: { VTable },
  setup() {
    const router = useRouter()
    const form = ref(null)
    const { proxy } = getCurrentInstance()
    const { tableConfig } = renderTable.call(proxy)
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
    const searchForm = reactive({
      entryId: '',
      region: '',
    })
    const searchParams = ref({})
    const multipleSelection = ref([])
    const isHaveSelect = computed(
      () => multipleSelection.value && multipleSelection.value.length > 0
    )

    // 表格查询
    const handleQuery = () => {
      searchParams.value = deepClone(searchForm)
      table.currentPage = 1
      handleQueryTable()
    }
    const handleReset = (formEL) => {
      formEL.resetFields()
      searchParams.value = {}
      searchForm = {}
      handleQuery()
    }
    const handleQueryTable = () => {
      table.value.getTableData(searchForm, (res) => {
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
      tableConfig.rowClassFunc = tableRowClassName
    })
    onMounted(() => {
      handleQuery()
    })
    return {
      form,
      table,
      tableData,
      searchForm,
      multipleSelection,
      handleOperation,
      handleQuery,
      handleReset,
      tableConfig,
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
